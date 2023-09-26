"use client"

import { FormEvent, useRef, useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import CardContainer from '@components/CardContainer'
import TextWrap from '@components/TextWrap'
import { EndType } from '@utils/types'
import fetchApi from '@utils/fetchApi'
import FormInput from '@components/FormInput'
import FormSubmit from '@components/FormSubmit'
import { useTranslations } from 'next-intl'

const Sash = () => {
  const t = useTranslations()
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [type, setType] = useState('');
  const [result, setResult] = useState("");
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null);

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/sash', { amount, length, width, fabricWidth, type });
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
    setResult("");
    setError('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{t("Sash")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={t("Straight")} name='type' onClick={() => setType(EndType.Straight)} />
          <Form.Check inline type='radio' label={t("Slant")} name='type' onClick={() => setType(EndType.Slant)} />
        </div>
        <FormInput label={t("Amount")} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={t("Length")} className='mb-3' controlId='length' onChange={(e) => setLength(+e.target.value)} />
        <FormInput label={t("Width")} className='mb-3' controlId='width' onChange={(e) => setWidth(+e.target.value)} />
        <FormInput label={t("Fabric_Width")} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Sash