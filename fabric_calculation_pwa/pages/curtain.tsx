import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap'
import fetchApi from '../utils/helpers/fetchApi';
import getLabels from '../utils/i18n/labels';

const Curtain: NextPage = () => {
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [cuts, setCuts] = useState(0);
  const [multiple, setMultiple] = useState(0);
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Length, Width, Fabric_Width, Calculate, Clear, Curtain, No_Cut, Cut, One, OneFive, Two, TwoFive, Three, ThreeFive  } = getLabels(useRouter().locale);

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchApi('/api/curtain', { amount, length, width, fabricWidth, cuts, multiple });
    if (res.message) {
      setResult(res.message);
    } else {
      setResult(`${res.yards}y\n${res.meters}m`);
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(0);
    setLength(0);
    setWidth(0);
    setFabricWidth(0);
    setCuts(0);
    setMultiple(0);
    setResult('');
  }

  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>{Curtain}</h2>
            <Form onSubmit={calculate} ref={form}>
              <div className='text-center'>
                <Form.Check inline type='radio' label={No_Cut} name='cuts' onClick={() => setCuts(0)} />
                <Form.Check inline type='radio' label={Cut} name='cuts' onClick={() => setCuts(1)} />
              </div>
              <div className='text-center'>
                <Form.Check inline type='radio' label={One} name='multiple' onClick={() => setMultiple(1)} />
                <Form.Check inline type='radio' label={OneFive} name='multiple' onClick={() => setMultiple(1.5)} />
                <Form.Check inline type='radio' label={Two} name='multiple' onClick={() => setMultiple(2)} />
                <Form.Check inline type='radio' label={TwoFive} name='multiple' onClick={() => setMultiple(2.5)} />
                <Form.Check inline type='radio' label={Three} name='multiple' onClick={() => setMultiple(3)} />
                <Form.Check inline type='radio' label={ThreeFive} name='multiple' onClick={() => setMultiple(3.5)} />
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
              <Row className='mb-3'>
                <Col className='text-center'><Button type='submit'>{Calculate}</Button></Col>
                <Col className='text-center'><Button onClick={clear}>{Clear}</Button></Col>
              </Row>
              <div className='text-center'>{result}</div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Curtain