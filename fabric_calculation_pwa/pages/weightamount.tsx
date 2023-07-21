import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import CardContainer from '../components/CardContainer';
import { PageProps } from '../types/PageProps';
import { FabricType, TubeType } from '../models/WeightAmount.model';
import fetchApi from '../utils/helpers/fetchApi';
import TextWrap from '../components/TextWrap';
import FormInput from '../components/FormInput';
import FormSubmit from '../components/FormSubmit';

const WeightAmount: NextPage<PageProps> = ({ locale, labels }) => {
  const [weight, setWeight] = useState(0);
  const [tube, setTube] = useState('');
  const [fabric, setFabric] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Weight, Calculate, Clear, Small_Tube, Big_Tube, Weight_And_Amount } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/weightandamount', { weight, tube, fabric }, locale);
    setError('');
    if (status !== 200) {
      setError(data.message!);
    } else {
      setResult(`${data.result}y`)
    }
  }

  const clear = () => {
    form.current!.reset();
    setWeight(0);
    setTube('');
    setFabric('');
    setResult('');
    setError('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{Weight_And_Amount}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={Small_Tube} name='type' onClick={() => setTube(TubeType.Small)} />
          <Form.Check inline type='radio' label={Big_Tube} name='type' onClick={() => setTube(TubeType.Big)} />
        </div>
        <div className='text-center'>
          <Form.Check inline type='radio' label='Satin' name='fabric' onClick={() => setFabric(FabricType.Satin)} />
          <Form.Check inline type='radio' label='Poplin' name='fabric' onClick={() => setFabric(FabricType.Poplin)} />
        </div>
        <FormInput label={Weight} className='mb-3' controlId='amount' onChange={(e) => setWeight(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={Calculate} clearLabel={Clear} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default WeightAmount