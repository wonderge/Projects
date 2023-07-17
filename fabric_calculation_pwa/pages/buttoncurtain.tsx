import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import CardContainer from '../components/CardContainer'
import TextWrap from '../components/TextWrap'
import { PageProps } from '../types/PageProps'
import fetchApi from '../utils/helpers/fetchApi'
import FormInput from '../components/FormInput'
import FormSubmit from '../components/FormSubmit'

const ButtonCurtain: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [height, setHeight] = useState(0);
  const [patternSize, setPatternSize] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Height, Pattern_Size, Fabric_Width, Button_Curtain, Calculate, Clear, SE_Spacing, Spacing, Button_Count } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/buttoncurtain', { amount, height, patternSize, fabricWidth }, locale);
    if (status !== 200) {
      setResult(data.message!)
    } else {
      const { sides, sizes, buttonAmounts } = data.extras;
      let extra: string[] = [];
      for (let i = 0; i < sides.length; i++) {
        extra.push(`${SE_Spacing}: ${sides[i]}cm\n${Spacing}: ${sizes[i]}cm\n${Button_Count}: ${buttonAmounts[i]}pcs\n\n`)
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
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{Button_Curtain}</h2>
      <Form onSubmit={calculate} ref={form}>
        <FormInput label={Amount} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={Height} className='mb-3' controlId='height' onChange={(e) => setHeight(+e.target.value)} />
        <FormInput label={Pattern_Size} className='mb-3' controlId='pattern-size' onChange={(e) => setPatternSize(+e.target.value)} />
        <FormInput label={Fabric_Width} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={Calculate} clearLabel={Clear} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default ButtonCurtain