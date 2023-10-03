"use client"

import { useState } from 'react';
import { Alert, Form } from 'react-bootstrap'
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import CardContainer from '@components/CardContainer';
import TextWrap from '@components/TextWrap';
import FormInput from '@components/FormInput';
import FormSubmit from '@components/FormSubmit';
import fetchApi from '@utils/fetchApi';

const Gauze = () => {
  const { register, handleSubmit, reset } = useForm();
  const t = useTranslations()
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    const { status, result } = await fetchApi('/api/gauze', data);
    setError('');
    if (status !== 200) {
      setResult(result.message!);
    } else {
      setResult(`${result.yards}y\n${result.meters}m`);
    }
  }

  const clear = () => {
    reset()
    setResult('');
    setError('');
  }

  const registerAsNum = (name: any) => register(name, { setValueAs: (v) => v === "" ? 0 : parseFloat(v)})

  return (
    <CardContainer>
      <h2 className='text-center'>{t("Gauze")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={t("No_Cut")} {...registerAsNum("cuts")} value={0} />
          <Form.Check inline type='radio' label={t("Cut")} {...registerAsNum("cuts")} value={1} />
        </div>
        <div className='text-center'>
          <Form.Check inline type='radio' label={t("One")} {...registerAsNum("multiple")} value={1} />
          <Form.Check inline type='radio' label={t("OneFive")} {...registerAsNum("multiple")} value={1.5} />
          <Form.Check inline type='radio' label={t("Two")} {...registerAsNum("multiple")} value={2} />
          <Form.Check inline type='radio' label={t("TwoFive")} {...registerAsNum("multiple")} value={2.5} />
          <Form.Check inline type='radio' label={t("Three")} {...registerAsNum("multiple")} value={3} />
          <Form.Check inline type='radio' label={t("ThreeFive")} {...registerAsNum("multiple")} value={3.5} />
        </div>
        <FormInput label={t("Amount")} className='mb-3' controlId='amount' {...registerAsNum("amount")} />
        <FormInput label={t("Length")} className='mb-3' controlId='length' {...registerAsNum("length")} />
        <FormInput label={t("Height")} className='mb-3' controlId='height' {...registerAsNum("height")} />
        <FormInput label={t("Fabric_Width")} className='mb-3' controlId='fabric-width' {...registerAsNum("fabricWidth")} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Gauze