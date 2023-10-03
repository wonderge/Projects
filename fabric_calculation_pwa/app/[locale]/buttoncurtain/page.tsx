"use client"

import {  useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import CardContainer from '@components/CardContainer'
import TextWrap from '@components/TextWrap'
import fetchApi from '@utils/fetchApi'
import FormInput from '@components/FormInput'
import FormSubmit from '@components/FormSubmit'

const ButtonCurtain = () => {
  const { register, handleSubmit, reset } = useForm();
  const t = useTranslations()
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    const { status, result } = await fetchApi('/api/buttoncurtain', data);
    setError('');
    if (status !== 200) {
      setError(result.message!)
    } else {
      const { extras: { sides, sizes, buttonAmounts } } = result;
      let extra: string[] = [];
      for (let i = 0; i < sides.length; i++) {
        extra.push(`${t("SE_Spacing")}: ${sides[i]}cm\n${t("Spacing")}: ${sizes[i]}cm\n${t("Button_Count")}: ${buttonAmounts[i]}pcs`)
      }
      let msg = `${result.yards}y\n${result.meters}m` + extra.join("\n\n");
      setResult(msg)
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
      <h2 className='text-center'>{t("Button_Curtain")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label={t("Amount")} className='mb-3' controlId='amount' {...registerAsNum("amount")} />
        <FormInput label={t("Height")} className='mb-3' controlId='height' {...registerAsNum("height")} />
        <FormInput label={t("Pattern_Size")} className='mb-3' controlId='pattern-size' {...registerAsNum("patternSize")} />
        <FormInput label={t("Fabric_Width")} className='mb-3' controlId='fabric-width' {...registerAsNum("fabricWidth")} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default ButtonCurtain