import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap'
import { PageProp } from '../models/PageProp'
import fetchApi from '../utils/helpers/fetchApi'

const Flower: NextPage<PageProp> = ({ locale, labels }) => {
  const [amount, setAmount] = useState<number[]>(Array(9).fill(0));
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Length, Width, Calculate, Clear, Flower } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchApi('/api/flower', { amount, length, width }, locale);
    if (res.message) {
      setResult(res.message);
    } else {
      setResult(`${res.required}pcs`)
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(Array(9).fill(0));
    setLength(0);
    setWidth(0);
    setResult('');
  }

  const updateAmountAt = (value: number, index: number) => {
    setAmount(amount.map((e, i) => i == index ? value : e))
  }

  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>{Flower}</h2>
            <Form onSubmit={calculate} ref={form}>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="80cm">
                  <Form.Label>80cm</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => updateAmountAt(+e.target.value, 0)} />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="70cm">
                  <Form.Label>70cm</Form.Label>
                  <Form.Control type="number" onChange={(e) => updateAmountAt(+e.target.value, 1)} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="60cm">
                  <Form.Label>60cm</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => updateAmountAt(+e.target.value, 2)} />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="50cm">
                  <Form.Label>50cm</Form.Label>
                  <Form.Control type="number" onChange={(e) => updateAmountAt(+e.target.value, 3)} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="40cm">
                  <Form.Label>40cm</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => updateAmountAt(+e.target.value, 4)} />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="30cm">
                  <Form.Label>30cm</Form.Label>
                  <Form.Control type="number" onChange={(e) => updateAmountAt(+e.target.value, 5)} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="20cm">
                  <Form.Label>20cm</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => updateAmountAt(+e.target.value, 6)} />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="15cm">
                  <Form.Label>15cm</Form.Label>
                  <Form.Control type="number" onChange={(e) => updateAmountAt(+e.target.value, 7)} />
                </Form.Group>
              </Row>
              <div className='d-flex justify-content-center'>
                <Form.Group className="mb-3" controlId="10cm">
                  <Form.Label>10cm</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => updateAmountAt(+e.target.value, 8)} />
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="length">
                <Form.Label>{Length}</Form.Label>
                <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => setLength(+e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="width">
                <Form.Label>{Width}</Form.Label>
                <Form.Control type="number" className='mr-3 pr-3' onChange={(e) => setWidth(+e.target.value)} />
              </Form.Group>
              <Row>
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

export default Flower