import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Form, Image, Row, Col } from 'react-bootstrap'
import CardContainer from '../components/CardContainer'
import TextWrap from '../components/TextWrap'
import { PageProps } from '../types/PageProps'
import fetchApi from '../utils/helpers/fetchApi'
import FormSubmit from '../components/FormSubmit'
import FormInput from '../components/FormInput'

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
    const { status, data } = await fetchApi('/api/chaircover', { amount, fabricWidth, a, b, c, d, e, f, g, h }, locale);
    if (status !== 200) {
      setResult(data.message!);
    } else {
      setResult(`${data.yards}y\n${data.meters}m`)
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
            <FormInput label='A' className='mb-3' controlId='a' onChange={(e) => setA(+e.target.value)} />
            <FormInput label='B' className='mb-3' controlId='b' onChange={(e) => setB(+e.target.value)} />
          </Col>
          <Col className='text-center'><Image src='/chaircover.png' alt='picture of chair with labels A-H for dimensions' width={140} /></Col>
        </Row>
        <Row>
          <FormInput label='C' className='mb-3' controlId='c' onChange={(e) => setC(+e.target.value)} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='D' className='mb-3' controlId='d' onChange={(e) => setD(+e.target.value)} as={Col} />
        </Row>
        <Row>
          <FormInput label='E' className='mb-3' controlId='e' onChange={(e) => setE(+e.target.value)} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='F' className='mb-3' controlId='f' onChange={(e) => setF(+e.target.value)} as={Col} />
        </Row>
        <Row>
          <FormInput label='G' className='mb-3' controlId='g' onChange={(e) => setG(+e.target.value)} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='H' className='mb-3' controlId='h' onChange={(e) => setH(+e.target.value)} as={Col} />
        </Row>
        <Row>
          <FormInput label={Amount} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label={Fabric_Width} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} as={Col} />
        </Row>
        <FormSubmit className='mb-3' calculateLabel={Calculate} clearLabel={Clear} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Chaircover