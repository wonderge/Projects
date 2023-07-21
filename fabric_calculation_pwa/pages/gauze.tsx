import type { NextPage } from 'next'
import { useState, useRef, FormEvent } from 'react';
import { Alert, Form } from 'react-bootstrap'
import CardContainer from '../components/CardContainer';
import TextWrap from '../components/TextWrap';
import { PageProps } from '../types/PageProps';
import fetchApi from '../utils/helpers/fetchApi';
import FormInput from '../components/FormInput';
import FormSubmit from '../components/FormSubmit';

const Gauze: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [cuts, setCuts] = useState(0);
  const [multiple, setMultiple] = useState(0);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Length, Height, Fabric_Width, Calculate, Clear, Gauze, No_Cut, Cut, One, OneFive, Two, TwoFive, Three, ThreeFive } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/gauze', { amount, length, width: height, fabricWidth, cuts, multiple }, locale);
    setError('');
    if (status !== 200) {
      setResult(data.message!);
    } else {
      setResult(`${data.yards}y\n${data.meters}m`);
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(0);
    setLength(0);
    setHeight(0);
    setFabricWidth(0);
    setCuts(0);
    setMultiple(0);
    setResult('');
    setError('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{Gauze}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={No_Cut} name='cuts' onClick={() => setCuts(0)} />
          <Form.Check inline type='radio' label={Cut} name='cuts' onClick={() => setCuts(1)} />
        </div>
        <div className='text-center'>
          <Form.Check inline type='radio' label={One} name='multiple' onClick={() => setMultiple(1)} />
          <Form.Check inline type='radio' label={OneFive} name='multiple' onClick={() => setMultiple(1.5)} />
          <Form.Check inline type='radio' label={Two} name='multiple' onClick={() => setMultiple(2)} />
          <Form.Check inline type='radio' label={TwoFive} name='multiple' onClick={() => setMultiple(2.5)} />
          <Form.Check inline type='radio' label={Three} name='multiple' onClick={() => setMultiple(3)} />
          <Form.Check inline type='radio' label={ThreeFive} name='multiple' onClick={() => setMultiple(3.5)} />
        </div>
        <FormInput label={Amount} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={Length} className='mb-3' controlId='length' onChange={(e) => setLength(+e.target.value)} />
        <FormInput label={Height} className='mb-3' controlId='height' onChange={(e) => setHeight(+e.target.value)} />
        <FormInput label={Fabric_Width} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={Calculate} clearLabel={Clear} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Gauze