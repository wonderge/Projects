"use client"

import { FormEvent, useRef, useState } from 'react';
import { Alert, Form, } from 'react-bootstrap'
import CardContainer from '@components/CardContainer';
import TextWrap from '@components/TextWrap';
import fetchApi from '@utils/fetchApi';
import FormInput from '@components/FormInput';
import FormSubmit from '@components/FormSubmit';
import { useTranslations } from 'next-intl';

const Curtain = () => {
  const t = useTranslations()
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [cuts, setCuts] = useState(0);
  const [multiple, setMultiple] = useState(0);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null);

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/curtain', { amount, length, height, fabricWidth, cuts, multiple });
    setError('');
    if (status !== 200) {
      setError(data.message!);
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
      <h2 className='text-center'>{t("Curtain")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={t("No_Cut")} name='cuts' onClick={() => setCuts(0)} />
          <Form.Check inline type='radio' label={t("Cut")} name='cuts' onClick={() => setCuts(1)} />
        </div>
        <div className='text-center'>
          <Form.Check inline type='radio' label={t("One")} name='multiple' onClick={() => setMultiple(1)} />
          <Form.Check inline type='radio' label={t("OneFive")} name='multiple' onClick={() => setMultiple(1.5)} />
          <Form.Check inline type='radio' label={t("Two")} name='multiple' onClick={() => setMultiple(2)} />
          <Form.Check inline type='radio' label={t("TwoFive")} name='multiple' onClick={() => setMultiple(2.5)} />
          <Form.Check inline type='radio' label={t("Three")} name='multiple' onClick={() => setMultiple(3)} />
          <Form.Check inline type='radio' label={t("ThreeFive")} name='multiple' onClick={() => setMultiple(3.5)} />
        </div>
        <FormInput label={t("Amount")} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={t("Length")} className='mb-3' controlId='length' onChange={(e) => setLength(+e.target.value)} />
        <FormInput label={t("Height")} className='mb-3' controlId='height' onChange={(e) => setHeight(+e.target.value)} />
        <FormInput label={t("Fabric_Width")} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Curtain