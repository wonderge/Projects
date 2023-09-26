"use client"

import { FormEvent, useRef, useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import CardContainer from '@components/CardContainer'
import TextWrap from '@components/TextWrap'
import fetchApi from '@utils/fetchApi'
import FormInput from '@components/FormInput'
import FormSubmit from '@components/FormSubmit'
import { useTranslations } from 'next-intl'

const ButtonCurtain = () => {
  const t = useTranslations()
  const [amount, setAmount] = useState(0);
  const [height, setHeight] = useState(0);
  const [patternSize, setPatternSize] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null);

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/buttoncurtain', { amount, height, patternSize, fabricWidth });
    setError('');
    if (status !== 200) {
      setError(data.message!)
    } else {
      const { sides, sizes, buttonAmounts } = data.extras;
      let extra: string[] = [];
      for (let i = 0; i < sides.length; i++) {
        extra.push(`${t("SE_Spacing")}: ${sides[i]}cm\n${t("Spacing")}: ${sizes[i]}cm\n${t("Button_Count")}: ${buttonAmounts[i]}pcs\n\n`)
      }
      let msg = `${data.yards}y\n${data.meters}m` + extra.join("");
      setResult(msg)
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(0);
    setHeight(0);
    setPatternSize(0);
    setFabricWidth(0);
    setResult('');
    setError('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{t("Button_Curtain")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={calculate} ref={form}>
        <FormInput label={t("Amount")} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={t("Height")} className='mb-3' controlId='height' onChange={(e) => setHeight(+e.target.value)} />
        <FormInput label={t("Pattern_Size")} className='mb-3' controlId='pattern-size' onChange={(e) => setPatternSize(+e.target.value)} />
        <FormInput label={t("Fabric_Width")} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default ButtonCurtain