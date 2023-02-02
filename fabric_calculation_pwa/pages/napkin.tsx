import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import CardContainer from '../components/CardContainer';
import { PageProps } from '../types/PageProps';
import { SideType } from '../types/SideType';
import fetchApi from '../utils/helpers/fetchApi';

const Napkin: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [fabricAmount, setFabricAmount] = useState(0);
  const [type, setType] = useState('');
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Length, Width, Fabric_Width, Fabric_Amount, Hemmed, Marrow, Napkin, Calculate, Clear } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const res = await fetchApi('/api/napkin', { amount, length, width, fabricWidth, fabricAmount, type }, locale);
    if (res.message !== undefined) {
      setResult(res.message);
    } else if (res.amount !== 0) {
      setResult(`${res.amount}pcs`);
    } else {
      setResult(`${res.yards}y\n${res.meters}m`);
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
    <CardContainer>
      <h2 className='text-center'>{Napkin}</h2>
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={Marrow} name='type' onClick={() => setType(SideType.Marrow)} />
          <Form.Check inline type='radio' label={Hemmed} name='type' onClick={() => setType(SideType.Hemmed)} />
        </div>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>{Amount}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setAmount(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="length">
          <Form.Label>{Length}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setLength(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="width">
          <Form.Label>{Width}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setWidth(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fabric-width">
          <Form.Label>{Fabric_Width}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setFabricWidth(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fabric-amount">
          <Form.Label>{Fabric_Amount}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setFabricAmount(+e.target.value)} />
        </Form.Group>
        <Row className='mb-3'>
          <Col className='text-center'><Button type='submit'>{Calculate}</Button></Col>
          <Col className='text-center'><Button onClick={clear}>{Clear}</Button></Col>
        </Row>
        <div className='text-center' style={{ whiteSpace: "pre" }}>{result}</div>
      </Form>
    </CardContainer>
  )
}

export default Napkin