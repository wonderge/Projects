import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap'
import CardContainer from '../components/CardContainer';
import TextWrap from '../components/TextWrap';
import { PageProps } from '../types/PageProps';
import ResType from '../types/ResType';
import fetchApi from '../utils/helpers/fetchApi';

const Roundcloth: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [fabricAmount, setFabricAmount] = useState(0);
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Diameter, Fabric_Width, Fabric_Amount, Calculate, Clear, Roundcloth, Sidelength } = labels;

  const getSidelengthMsg = ({ extras }: ResType) => {
    let { sideLength }: { sideLength: number[] | undefined } = extras

    if (sideLength?.length && sideLength.length < 2) {
      return `${Sidelength} 1: ${sideLength[0]}inch`;
    } else if (sideLength?.length && sideLength.length > 1) {
      return `${Sidelength} 1: ${sideLength[0]}inch\n${Sidelength} 2: ${sideLength[1]}inch`;
    }
  }

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchApi('/api/roundcloth', { amount, diameter, fabricWidth, fabricAmount }, locale);
    if (res.message) {
      setResult(res.message);
    } else if (res.amount !== undefined) {
      let msg = `${res.amount}pcs\n${getSidelengthMsg(res)}`
      setResult(msg)
    } else {
      let msg = `${res.yards}y ${res.meters}m\n${getSidelengthMsg(res)}`;
      setResult(msg)
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(0);
    setDiameter(0);
    setFabricWidth(0);
    setFabricAmount(0);
    setResult('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{Roundcloth}</h2>
      <Form onSubmit={calculate} ref={form}>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>{Amount}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setAmount(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="diameter">
          <Form.Label>{Diameter}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setDiameter(+e.target.value)} />
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
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Roundcloth