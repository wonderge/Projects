import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import CardContainer from '../components/CardContainer'
import TextWrap from '../components/TextWrap'
import { PageProps } from '../types/PageProps'
import fetchApi from '../utils/helpers/fetchApi'

const Clip: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [skirtAmount, setSkirtAmount] = useState(0);
  const [skirtLength, setSkirtLength] = useState(0);
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Length, Width, Fabric_Width, Skirt_Amount, Skirt_Length, Calculate, Clear, Clip } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchApi('/api/clip', { amount, length, width, fabricWidth, skirtAmount, skirtLength }, locale);
    if (res.message) {
      setResult(res.message);
    } else {
      setResult(`${res.yards}y\n${res.meters}m`)
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(0);
    setLength(0);
    setWidth(0);
    setFabricWidth(0);
    setSkirtAmount(0);
    setSkirtLength(0);
    setResult('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{Clip}</h2>
      <Form onSubmit={calculate} ref={form}>
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
        <Form.Group className="mb-3" controlId="skirt-amount">
          <Form.Label>{Skirt_Amount}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setSkirtAmount(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="skirt-length">
          <Form.Label>{Skirt_Length}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setSkirtLength(+e.target.value)} />
        </Form.Group>
        <Row className='mb-3'>
          <Col className='text-center'><Button type='submit'>{Calculate}</Button></Col>
          <Col className='text-center'><Button onClick={clear}>{Clear}</Button></Col>
        </Row>
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Clip