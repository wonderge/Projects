"use client"

import { useState } from 'react'
import { Form, Image, Row, Col, Alert } from 'react-bootstrap'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import CardContainer from '@components/CardContainer'
import TextWrap from '@components/TextWrap'
import FormSubmit from '@components/FormSubmit'
import FormInput from '@components/FormInput'
import fetchApi from '@utils/fetchApi'

const Chaircover = () => {
  const { register, handleSubmit, reset } = useForm()
  const t = useTranslations()
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    const { status, result } = await fetchApi('/api/chaircover', data);
    setError('');
    if (status !== 200) {
      setError(result.message!);
    } else {
      setResult(`${result.yards}y\n${result.meters}m`)
    }
  }

  const clear = () => {
    reset()
    setResult('');
    setError('');
  }

  const registerAsNum = (name: string) => register(name, { setValueAs: (v) =>  v === "" ? 0: parseFloat(v) })

  return (
    <CardContainer>
      <h2 className='text-center'>{t("Chaircover")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <FormInput label='A' className='mb-3' controlId='a' {...registerAsNum("A")} />
            <FormInput label='B' className='mb-3' controlId='b' {...registerAsNum("B")} />
          </Col>
          <Col className='text-center'><Image src='/chaircover.png' alt='picture of chair with labels A-H for dimensions' width={140} /></Col>
        </Row>
        <Row>
          <FormInput label='C' className='mb-3' controlId='c' {...registerAsNum("C")} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='D' className='mb-3' controlId='d' {...registerAsNum("D")} as={Col} />
        </Row>
        <Row>
          <FormInput label='E' className='mb-3' controlId='e' {...registerAsNum("E")} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='F' className='mb-3' controlId='f' {...registerAsNum("F")} as={Col} />
        </Row>
        <Row>
          <FormInput label='G' className='mb-3' controlId='g' {...registerAsNum("G")} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label='H' className='mb-3' controlId='h' {...registerAsNum("H")} as={Col} />
        </Row>
        <Row>
          <FormInput label={t("Amount")} className='mb-3' controlId='amount' {...registerAsNum("amount")} as={Col} innerClassName='mr-3 pr-3' />
          <FormInput label={t("Fabric_Width")} className='mb-3' controlId='fabric-width' {...registerAsNum("fabricWidth")} as={Col} />
        </Row>
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Chaircover