import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Container, Card, Form, Button, Col, Row } from 'react-bootstrap'
import { PageProp } from '../models/PageProp';
import { FabricType, TubeType } from '../models/WeightAmountModel';
import fetchApi from '../utils/helpers/fetchApi';

const WeightAmount: NextPage<PageProp> = ({ locale, labels }) => {
  const [weight, setWeight] = useState(0);
  const [tube, setTube] = useState('');
  const [fabric, setFabric] = useState('');
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Weight, Calculate, Clear, Small_Tube, Big_Tube, Weight_And_Amount } = labels;
  
  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchApi('/api/weightandamount',  { weight, tube, fabric }, locale);
    if (res.message) {
      setResult(res.message);
    } else {
      setResult(`${result}y`)
    }
  }

  const clear = () => {
    form.current!.reset();
    setWeight(0);
    setTube('');
    setFabric('');
    setResult('');
  }

  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>{Weight_And_Amount}</h2>
            <Form onSubmit={calculate} ref={form}>
              <div className='text-center'>
                <Form.Check inline type='radio' label={Small_Tube} name='type' onClick={() => setTube(TubeType.Small)} />
                <Form.Check inline type='radio' label={Big_Tube} name='type' onClick={() => setTube(TubeType.Big)} />
              </div>
              <div className='text-center'>
                <Form.Check inline type='radio' label='Satin' name='fabric' onClick={() => setFabric(FabricType.Satin)} />
                <Form.Check inline type='radio' label='Poplin' name='fabric' onClick={() => setFabric(FabricType.Poplin)} />
              </div>
              <Form.Group className="mb-3" controlId="fabric-amount">
                <Form.Label>{Weight}</Form.Label>
                <Form.Control type="number"  onChange={(e) => setWeight(+e.target.value)} />
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

export default WeightAmount