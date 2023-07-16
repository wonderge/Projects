import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import CardContainer from '../components/CardContainer'
import TextWrap from '../components/TextWrap'
import { PageProps } from '../types/PageProps'
import { EndType } from '../types/SideType'
import fetchApi from '../utils/helpers/fetchApi'
import FormInput from '../components/FormInput'
import FormSubmit from '../components/FormSubmit'

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
        <FormInput label={Amount} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={Length} className='mb-3' controlId='length' onChange={(e) => setLength(+e.target.value)} />
        <FormInput label={Width} className='mb-3' controlId='width' onChange={(e) => setWidth(+e.target.value)} />
        <FormInput label={Fabric_Width} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={Calculate} clearLabel={Clear} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Sash