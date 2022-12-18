import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Form, Image, Row, Col, Button } from 'react-bootstrap'
import CardContainer from '../components/CardContainer'
import { PageProps } from '../models/PageProps'
import fetchApi from '../utils/helpers/fetchApi'

const Chaircover: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const [e, setE] = useState(0);
  const [f, setF] = useState(0);
  const [g, setG] = useState(0);
  const [h, setH] = useState(0);
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null)
  const { Amount, Fabric_Width, Calculate, Clear, Chaircover } = labels;

  const calculate = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const res = await fetchApi('/api/chaircover', { amount, fabricWidth, a, b, c, d, e, f, g, h }, locale);
    if (res.message) {
      setResult(res.message);
    } else {
      setResult(`${res.yards}y\n${res.meters}m`)
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(0);
    setFabricWidth(0);
    setA(0);
    setB(0);
    setC(0);
    setD(0);
    setE(0);
    setF(0);
    setG(0);
    setH(0);
    setResult('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{Chaircover}</h2>
      <Form onSubmit={calculate} ref={form}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="a">
              <Form.Label>A</Form.Label>
              <Form.Control type="number" onChange={(e) => setA(+e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="b">
              <Form.Label>B</Form.Label>
              <Form.Control type="number" onChange={(e) => setB(+e.target.value)} />
            </Form.Group>
          </Col>
          <Col className='text-center'><Image src='/chaircover.png' width={140} /></Col>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3" controlId="c">
            <Form.Label>C</Form.Label>
            <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => setC(+e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="d">
            <Form.Label>D</Form.Label>
            <Form.Control type="number" onChange={(e) => setD(+e.target.value)} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3" controlId="e">
            <Form.Label>E</Form.Label>
            <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => setE(+e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="f">
            <Form.Label>F</Form.Label>
            <Form.Control type="number" onChange={(e) => setF(+e.target.value)} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3" controlId="g">
            <Form.Label>G</Form.Label>
            <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => setG(+e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="h">
            <Form.Label>H</Form.Label>
            <Form.Control type="number" onChange={(e) => setH(+e.target.value)} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3" controlId="amount">
            <Form.Label>{Amount}</Form.Label>
            <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => setAmount(+e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="fabric-width">
            <Form.Label>{Fabric_Width}</Form.Label>
            <Form.Control type="number" onChange={(e) => setFabricWidth(+e.target.value)} />
          </Form.Group>
        </Row>
        <Row>
          <Col className='text-center'><Button type='submit'>{Calculate}</Button></Col>
          <Col className='text-center'><Button onClick={clear}>{Clear}</Button></Col>
        </Row>
        <div className='text-center'>{result}</div>
      </Form>
    </CardContainer>
  )
}

export default Chaircover