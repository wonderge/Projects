import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import CardContainer from '../components/CardContainer'
import TextWrap from '../components/TextWrap'
import { PageProps } from '../types/PageProps'
import fetchApi from '../utils/helpers/fetchApi'

const ButtonCurtain: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [height, setHeight] = useState(0);
  const [patternSize, setPatternSize] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Height, Pattern_Size, Fabric_Width, Button_Curtain, Calculate, Clear, SE_Spacing, Spacing, Button_Count } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchApi('/api/buttoncurtain', { amount, height, patternSize, fabricWidth }, locale);
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
    <CardContainer>
      <h2 className='text-center'>{Button_Curtain}</h2>
      <Form onSubmit={calculate} ref={form}>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>{Amount}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setAmount(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="length">
          <Form.Label>{Height}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setHeight(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="width">
          <Form.Label>{Pattern_Size}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setPatternSize(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fabric-width">
          <Form.Label>{Fabric_Width}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setFabricWidth(+e.target.value)} />
        </Form.Group>
        <Row>
          <Col className='text-center'><Button type='submit'>{Calculate}</Button></Col>
          <Col className='text-center'><Button onClick={clear}>{Clear}</Button></Col>
        </Row>
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default ButtonCurtain