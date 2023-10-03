"use client"

import { useState } from 'react'
import { Form, Row, Col, Alert } from 'react-bootstrap'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import CardContainer from '@components/CardContainer'
import TextWrap from '@components/TextWrap'
import fetchApi from '@utils/fetchApi'
import FormInput from '@components/FormInput'
import FormSubmit from '@components/FormSubmit'

const Flower= () => {
  const { register, handleSubmit, reset } = useForm()
  const t = useTranslations()
  const [amount, setAmount] = useState<number[]>(Array(9).fill(0));
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    const { status, result } = await fetchApi('/api/flower', data);
    setError('');
    if (status !== 200) {
      setError(result.message!);
    } else {
      setResult(`${result.required}pcs`)
    }
  }

  const clear = () => {
    reset()
    setResult('');
    setError('');
  }

  const updateAmountAt = (value: number, index: number) => {
    setAmount(amount.map((e, i) => i == index ? value : e))
  }

  const registerAsNum = (name: string) => register(name, { setValueAs: (v) =>  v === "" ? 0: parseFloat(v) })

  return (
    <CardContainer>
      <h2 className='text-center'>{t("Flower")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormInput label='80cm' className='mb-3' controlId='80cm' {...registerAsNum("amount.0")} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='70cm' className='mb-3' controlId='70cm' {...registerAsNum("amount.1")} as={Col} />
        </Row>
        <Row>
          <FormInput label='60cm' className='mb-3' controlId='60cm' {...registerAsNum("amount.2")} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='50cm' className='mb-3' controlId='50cm' {...registerAsNum("amount.3")} as={Col} />
        </Row>
        <Row>
          <FormInput label='40cm' className='mb-3' controlId='40cm' {...registerAsNum("amount.4")} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='30cm' className='mb-3' controlId='30cm' {...registerAsNum("amount.5")} as={Col} />
        </Row>
        <Row>
          <FormInput label='20cm' className='mb-3' controlId='20cm' {...registerAsNum("amount.6")} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='15cm' className='mb-3' controlId='15cm' {...registerAsNum("amount.7")} as={Col} />
        </Row>
        <div className='d-flex justify-content-center'>
          <FormInput label='10cm' className='mb-3' controlId='10cm' {...registerAsNum("amount.8")} as={Col} />
        </div>
        <FormInput label={t("Length")} className='mb-3' controlId='length' {...registerAsNum("length")} />
        <FormInput label={t("Width")} className='mb-3' controlId='width' {...registerAsNum("width")} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Flower