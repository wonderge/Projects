import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from 'react'
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap'
import fetchApi from '../utils/helpers/fetchApi'
import getLabels from '../utils/i18n/labels'

const ButtonCurtain: NextPage = () => {
  const [amount, setAmount] = useState(0);
  const [height, setHeight] = useState(0);
  const [patternSize, setPatternSize] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Height, Pattern_Size, Fabric_Width, Button_Curtain, Calculate, Clear, SE_Spacing, Spacing, Button_Count } = getLabels(useRouter().locale);

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchApi('/api/buttoncurtain',  { amount, height, patternSize, fabricWidth });
    if (res.message) {
      setResult(res.message)
    } else {
      const { sides, sizes, buttonAmounts } = res.extras;
      let extra: string[] = [];
      for (let i = 0; i < sides.length; i++) {
        extra.push(`${SE_Spacing}: ${sides[i]}cm\n${Spacing}: ${sizes[i]}cm\n${Button_Count}: ${buttonAmounts[i]}pcs\n\n`)
      }
      let msg = `${res.yards}y\n${res.meters}m` + extra.join("");
      setResult(msg)
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(0);
    setHeight(0);
    setPatternSize(0);
    setFabricWidth(0);
    setResult('');
  }

  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>{Button_Curtain}</h2>
            <Form onSubmit={calculate} ref={form}>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>{Amount}</Form.Label>
                <Form.Control type="number" onChange={(e) => setAmount(+e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="length">
                <Form.Label>{Height}</Form.Label>
                <Form.Control type="number" onChange={(e) => setHeight(+e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="width">
                <Form.Label>{Pattern_Size}</Form.Label>
                <Form.Control type="number" onChange={(e) => setPatternSize(+e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fabric-width">
                <Form.Label>{Fabric_Width}</Form.Label>
                <Form.Control type="number" onChange={(e) => setFabricWidth(+e.target.value)} />
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

export default ButtonCurtain