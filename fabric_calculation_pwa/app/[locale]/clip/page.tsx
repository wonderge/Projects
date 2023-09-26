"use client"

import { FormEvent, useRef, useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import CardContainer from '@components/CardContainer'
import TextWrap from '@components/TextWrap'
import fetchApi from '@utils/fetchApi'
import FormInput from '@components/FormInput'
import FormSubmit from '@components/FormSubmit'
import { useTranslations } from 'next-intl'

const Clip = () => {
  const t = useTranslations()
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [skirtAmount, setSkirtAmount] = useState(0);
  const [skirtLength, setSkirtLength] = useState(0);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null);

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/clip', { amount, length, width, fabricWidth, skirtAmount, skirtLength });
    setError('');
    if (status !== 200) {
      setError(data.message!);
    } else {
      setResult(`${data.yards}y\n${data.meters}m`)
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
    setError('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{t("Clip")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={calculate} ref={form}>
        <FormInput label={t("Amount")} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={t("Length")} className='mb-3' controlId='length' onChange={(e) => setLength(+e.target.value)} />
        <FormInput label={t("Width")} className='mb-3' controlId='width' onChange={(e) => setWidth(+e.target.value)} />
        <FormInput label={t("Fabric_Width")} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormInput label={t("Skirt_Amount")} className='mb-3' controlId='skirt-amount' onChange={(e) => setSkirtAmount(+e.target.value)} />
        <FormInput label={t("Skirt_Length")} className='mb-3' controlId='skirt-length' onChange={(e) => setSkirtLength(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Clip