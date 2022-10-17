import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import ResModel from '../models/ResModel';
import { SideType } from '../models/SideType';
import getLabels from '../utils/i18n/labels';

const Napkin: NextPage = () => {
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [fabricAmount, setFabricAmount] = useState(0);
  const [type, setType] = useState('');
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Length, Width, Fabric_Width, Fabric_Amount, Hemmed, Marrow, Napkin, Calculate, Clear } = getLabels(useRouter().locale);

  const calculate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const res = await fetch('/api/napkin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount, length, width, fabricWidth, fabricAmount, type }) });
    const data: ResModel = await res.json();
    if (data.message !== undefined) {
      setResult(data.message);
    } else if (data.amount !== 0) {
      setResult(`${data.amount}pcs`);
    } else {
      setResult(`${data.yards}y\n${data.meters}m`);
    }
  }

  const clear = (): void => {
    form.current!.reset();
    setAmount(0);
    setLength(0);
    setWidth(0);
    setFabricWidth(0);
    setFabricAmount(0);
  }  

  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>{Napkin}</h2>
            <Form onSubmit={calculate} ref={form}>
              <div className='text-center'>
                <Form.Check inline type='radio' label={Marrow} name='type' onClick={() => setType(SideType.Marrow)} />
                <Form.Check inline type='radio' label={Hemmed} name='type' onClick={() => setType(SideType.Hemmed)} />
              </div>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>{Amount}</Form.Label>
                <Form.Control type="number" onChange={(e) => setAmount(+e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="length">
                <Form.Label>{Length}</Form.Label>
                <Form.Control type="number" onChange={(e) => setLength(+e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="width">
                <Form.Label>{Width}</Form.Label>
                <Form.Control type="number" onChange={(e) => setWidth(+e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fabric-width">
                <Form.Label>{Fabric_Width}</Form.Label>
                <Form.Control type="number" onChange={(e) => setFabricWidth(+e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fabric-amount">
                <Form.Label>{Fabric_Amount}</Form.Label>
                <Form.Control type="number" onChange={(e) => setFabricAmount(+e.target.value)} />
              </Form.Group>
              <Row className='mb-3'>
                <Col className='text-center'><Button type='submit'>{Calculate}</Button></Col>
                <Col className='text-center'><Button onClick={clear}>{Clear}</Button></Col>
              </Row>
              <div className='text-center' style={{ whiteSpace: "pre" }}>{result}</div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Napkin