"use client"

import { FormEvent, useRef, useState } from 'react';
import { Alert, Form } from 'react-bootstrap'
import CardContainer from '@components/CardContainer';
import TextWrap from '@components/TextWrap';
import { Data, SideType } from '@utils/types';
import fetchApi from '@utils/fetchApi';
import FormInput from '@components/FormInput';
import FormSubmit from '@components/FormSubmit';
import { useTranslations } from 'next-intl';

const Roundcloth = () => {
  const t = useTranslations()
  const [amount, setAmount] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [fabricAmount, setFabricAmount] = useState(0);
  const [type, setType] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null);

  const getSidelengthMsg = ({ extras }: Data) => {
    let { sideLength }: { sideLength: number[] | undefined } = extras

    if (sideLength?.length && sideLength.length < 2) {
      return `${t("Sidelength")} 1: ${sideLength[0]}inch`;
    } else if (sideLength?.length && sideLength.length > 1) {
      return `${t("Sidelength")} 1: ${sideLength[0]}inch\n${t("Sidelength")} 2: ${sideLength[1]}inch`;
    }
  }

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/roundcloth', { amount, diameter, fabricWidth, fabricAmount, type });
    setError('');
    if (status !== 200) {
      setError(data.message!);
    } else if (data.hasOwnProperty('amount')) {
      let msg = `${data.amount}pcs\n${getSidelengthMsg(data)}`
      setResult(msg)
    } else {
      let msg = `${data.yards}y ${data.meters}m\n${getSidelengthMsg(data)}`;
      setResult(msg)
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(0);
    setDiameter(0);
    setFabricWidth(0);
    setFabricAmount(0);
    setResult('');
    setError('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{t("Roundcloth")}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
            <Form.Check inline type='radio' label={t("Marrow")} name='type' onClick={() => setType(SideType.Marrow)} />
            <Form.Check inline type='radio' label={t("Hemmed")} name='type' onClick={() => setType(SideType.Hemmed)} />
        </div>
        <FormInput label={t("Amount")} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={t("Diameter")} className='mb-3' controlId='diameter' onChange={(e) => setDiameter(+e.target.value)} />
        <FormInput label={t("Fabric_Width")} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormInput label={t("Fabric_Amount")} className='mb-3' controlId='fabric-amount' onChange={(e) => setFabricAmount(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={t("Calculate")} clearLabel={t("Clear")} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Roundcloth