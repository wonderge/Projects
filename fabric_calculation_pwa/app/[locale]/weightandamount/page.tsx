"use client"

import { useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import CardContainer from '@components/CardContainer';
import TextWrap from '@components/TextWrap';
import FormInput from '@components/FormInput';
import FormSubmit from '@components/FormSubmit';
import { FabricType, TubeType } from '@models/WeightAmount.model';
import fetchApi from '@utils/fetchApi';

const WeightAmount = () => {
  const { register, handleSubmit, reset } = useForm()
  const t = useTranslations()
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    const { status, result } = await fetchApi('/api/weightandamount', data);
    setError('');
    if (status !== 200) {
      setError(result.message!);
    } else {
      setResult(`${result.result}y`)
    }
  }

  const clear = () => {
    reset()
    setResult('');
    setError('');
  }

  const registerAsNum = (name: any) => register(name, { setValueAs: (v) =>  v === "" ? 0: parseFloat(v) })

  return (
    <CardContainer>
      <h2 className='text-center'>{t("Weight_And_Amount")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={t("Small_Tube")} {...register("type")} value={TubeType.Small} />
          <Form.Check inline type='radio' label={t("Big_Tube")} {...register("type")} value={TubeType.Big} />
        </div>
        <div className='text-center'>
          <Form.Check inline type='radio' label='Satin' {...register("fabric")} value={FabricType.Satin} />
          <Form.Check inline type='radio' label='Poplin' {...register("fabric")} value={FabricType.Poplin} />
        </div>
        <FormInput label={t("Weight")} className='mb-3' controlId='amount' {...registerAsNum("amount")} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default WeightAmount