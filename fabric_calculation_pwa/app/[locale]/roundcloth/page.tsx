"use client"

import { useState } from 'react';
import { Alert, Form } from 'react-bootstrap'
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import CardContainer from '@components/CardContainer';
import TextWrap from '@components/TextWrap';
import FormInput from '@components/FormInput';
import FormSubmit from '@components/FormSubmit';
import { Data, SideType } from '@utils/types';
import fetchApi from '@utils/fetchApi';

const Roundcloth = () => {
  const { register, handleSubmit, reset } = useForm();
  const t = useTranslations()
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const getSidelengthMsg = ({ extras }: Data) => {
    let { sideLength }: { sideLength: number[] | undefined } = extras

    if (sideLength?.length && sideLength.length < 2) {
      return `${t("Sidelength")} 1: ${sideLength[0]}inch`;
    } else if (sideLength?.length && sideLength.length > 1) {
      return `${t("Sidelength")} 1: ${sideLength[0]}inch\n${t("Sidelength")} 2: ${sideLength[1]}inch`;
    }
  }

  const onSubmit = async (data: any) => {
    const { status, result } = await fetchApi('/api/roundcloth', data);
    setError('');
    if (status !== 200) {
      setError(result.message!);
    } else if (result.hasOwnProperty('amount')) {
      let msg = `${result.amount}pcs\n${getSidelengthMsg(result)}`
      setResult(msg)
    } else {
      let msg = `${result.yards}y ${result.meters}m\n${getSidelengthMsg(result)}`;
      setResult(msg)
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
      <h2 className='text-center'>{t("Roundcloth")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-center'>
            <Form.Check inline type='radio' label={t("Marrow")} {...register("type")} value={SideType.Marrow} />
            <Form.Check inline type='radio' label={t("Hemmed")} {...register("type")} value={SideType.Hemmed} />
        </div>
        <FormInput label={t("Amount")} className='mb-3' controlId='amount' {...registerAsNum("amount")} />
        <FormInput label={t("Diameter")} className='mb-3' controlId='diameter' {...registerAsNum("diameter")} />
        <FormInput label={t("Fabric_Width")} className='mb-3' controlId='fabric-width' {...registerAsNum("fabricWidth")} />
        <FormInput label={t("Fabric_Amount")} className='mb-3' controlId='fabric-amount' {...registerAsNum("fabricAmount")} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Roundcloth