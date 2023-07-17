import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import CardContainer from '../components/CardContainer'
import TextWrap from '../components/TextWrap'
import { PageProps } from '../types/PageProps'
import fetchApi from '../utils/helpers/fetchApi'
import FormInput from '../components/FormInput'
import FormSubmit from '../components/FormSubmit'

const Flower: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState<number[]>(Array(9).fill(0));
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Length, Width, Calculate, Clear, Flower } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/flower', { amount, length, width }, locale);
    if (status !== 200) {
      setResult(data.message!);
    } else {
      setResult(`${data.required}pcs`)
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
    <CardContainer>
      <h2 className='text-center'>{Flower}</h2>
      <Form onSubmit={calculate} ref={form}>
        <Row>
          <FormInput label='80cm' className='mb-3' controlId='80cm' onChange={(e) => updateAmountAt(+e.target.value, 0)} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='70cm' className='mb-3' controlId='70cm' onChange={(e) => updateAmountAt(+e.target.value, 1)} as={Col} />
        </Row>
        <Row>
          <FormInput label='60cm' className='mb-3' controlId='60cm' onChange={(e) => updateAmountAt(+e.target.value, 2)} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='50cm' className='mb-3' controlId='50cm' onChange={(e) => updateAmountAt(+e.target.value, 3)} as={Col} />
        </Row>
        <Row>
          <FormInput label='40cm' className='mb-3' controlId='40cm' onChange={(e) => updateAmountAt(+e.target.value, 4)} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='30cm' className='mb-3' controlId='30cm' onChange={(e) => updateAmountAt(+e.target.value, 5)} as={Col} />
        </Row>
        <Row>
          <FormInput label='20cm' className='mb-3' controlId='20cm' onChange={(e) => updateAmountAt(+e.target.value, 6)} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='15cm' className='mb-3' controlId='15cm' onChange={(e) => updateAmountAt(+e.target.value, 7)} as={Col} />
        </Row>
        <div className='d-flex justify-content-center'>
          <FormInput label='10cm' className='mb-3' controlId='10cm' onChange={(e) => updateAmountAt(+e.target.value, 8)} as={Col} />
        </div>
        <FormInput label={Length} className='mb-3' controlId='length' onChange={(e) => setLength(+e.target.value)} />
        <FormInput label={Width} className='mb-3' controlId='width' onChange={(e) => setWidth(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={Calculate} clearLabel={Clear} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Flower