"use client"

import { useRef, FormEvent, useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import CardContainer from '@components/CardContainer'
import TextWrap from '@components/TextWrap'
import { SideType } from '@utils/types'
import fetchApi from '@utils/fetchApi'
import FormInput from '@components/FormInput'
import FormSubmit from '@components/FormSubmit'
import { useTranslations } from 'next-intl'

const Tablecloth = () => {
  const t = useTranslations();
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [fabricAmount, setFabricAmount] = useState(0);
  const [joints, setJoints] = useState(0);
  const [type, setType] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null)

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/tablecloth', { amount, length, width, fabricWidth, fabricAmount, type, joints });
    setError('');
    if (status !== 200) {
      setError(data.message!);
    } else if (data.hasOwnProperty('amount')) {
      setResult(`${data.amount}pcs`);
    } else {
      setResult(`${data.yards}y\n${data.meters}m`);
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(0);
    setLength(0);
    setWidth(0);
    setFabricWidth(0);
    setFabricAmount(0);
    setResult('');
    setError('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{t("Tablecloth")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={t("Marrow")} name='type' onClick={() => setType(SideType.Marrow)} />
          <Form.Check inline type='radio' label={t("Hemmed")} name='type' onClick={() => setType(SideType.Hemmed)} />
        </div>
        <div className='text-center'>
          <Form.Check inline type='radio' label={t("No_Joints")} name='joints' onClick={() => setJoints(0)} />
          <Form.Check inline type='radio' label={t("One_Joint")} name='joints' onClick={() => setJoints(1)} />
          <Form.Check inline type='radio' label={t("Two_Joints")} name='joints' onClick={() => setJoints(2)} />
        </div>
        <FormInput label={t("Amount")} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={t("Length")} className='mb-3' controlId='length' onChange={(e) => setLength(+e.target.value)} />
        <FormInput label={t("Width")} className='mb-3' controlId='width' onChange={(e) => setWidth(+e.target.value)} />
        <FormInput label={t("Fabric_Width")} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormInput label={t("Fabric_Amount")} className='mb-3' controlId='fabric-amount' onChange={(e) => setFabricAmount(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Tablecloth