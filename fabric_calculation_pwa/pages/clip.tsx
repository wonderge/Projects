import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import CardContainer from '../components/CardContainer'
import TextWrap from '../components/TextWrap'
import { PageProps } from '../types/PageProps'
import fetchApi from '../utils/helpers/fetchApi'
import FormInput from '../components/FormInput'
import FormSubmit from '../components/FormSubmit'

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
        <FormInput label={Amount} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={Length} className='mb-3' controlId='length' onChange={(e) => setLength(+e.target.value)} />
        <FormInput label={Width} className='mb-3' controlId='width' onChange={(e) => setWidth(+e.target.value)} />
        <FormInput label={Fabric_Width} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormInput label={Skirt_Amount} className='mb-3' controlId='skirt-amount' onChange={(e) => setSkirtAmount(+e.target.value)} />
        <FormInput label={Skirt_Length} className='mb-3' controlId='skirt-length' onChange={(e) => setSkirtLength(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={Calculate} clearLabel={Clear} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Clip