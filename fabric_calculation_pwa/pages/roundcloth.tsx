import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap'
import CardContainer from '../components/CardContainer';
import { PageProps } from '../types/PageProps';
import fetchApi from '../utils/helpers/fetchApi';

const Roundcloth: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [fabricAmount, setFabricAmount] = useState(0);
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Diameter, Fabric_Width, Fabric_Amount, Calculate, Clear, Roundcloth, Sidelength } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchApi('/api/roundcloth', { amount, diameter, fabricWidth, fabricAmount }, locale);
    if (res.message) {
      setResult(res.message);
    } else {
      let msg = `${res.yards}y\n${res.meters}m`;
      let { sidelength }: { sidelength: number[] | undefined } = res.extras;
      if (sidelength?.length && sidelength.length < 2) {
        msg += `\n${Sidelength} 1: ${sidelength[0]}inch`;
      } else if (sidelength?.length && sidelength.length > 1) {
        msg += `\n${Sidelength} 1: ${sidelength[0]}inch\n${Sidelength} 2: ${sidelength[1]}inch`;
      }
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
          <Form.Control type="number" onChange={(e) => setAmount(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="diameter">
          <Form.Label>{Diameter}</Form.Label>
          <Form.Control type="number" onChange={(e) => setDiameter(+e.target.value)} />
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
        <div className='text-center'>{result}</div>
      </Form>
    </CardContainer>
  )
}

export default Roundcloth