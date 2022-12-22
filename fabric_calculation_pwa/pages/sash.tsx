import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import CardContainer from '../components/CardContainer'
import { PageProps } from '../types/PageProps'
import { EndType } from '../types/SideType'
import fetchApi from '../utils/helpers/fetchApi'

const Sash: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [type, setType] = useState('');
  const [result, setResult] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Length, Width, Fabric_Width, Calculate, Clear, Straight, Slant, Sash } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchApi('/api/sash', { amount, length, width, fabricWidth, type }, locale);
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
    setResult("");
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{Sash}</h2>
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={Straight} name='type' onClick={(e) => setType(EndType.Straight)} />
          <Form.Check inline type='radio' label={Slant} name='type' onClick={(e) => setType(EndType.Slant)} />
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
    </CardContainer>
  )
}

export default Sash