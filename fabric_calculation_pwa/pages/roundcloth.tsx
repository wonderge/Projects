import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react';
import { Form } from 'react-bootstrap'
import CardContainer from '../components/CardContainer';
import TextWrap from '../components/TextWrap';
import { PageProps } from '../types/PageProps';
import { Data } from '../types/ResType';
import { SideType } from '../types/SideType';
import fetchApi from '../utils/helpers/fetchApi';
import FormInput from '../components/FormInput';
import FormSubmit from '../components/FormSubmit';

const Roundcloth: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [fabricAmount, setFabricAmount] = useState(0);
  const [type, setType] = useState('');
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Diameter, Fabric_Width, Fabric_Amount, Calculate, Clear, Roundcloth, Sidelength, Marrow, Hemmed } = labels;

  const getSidelengthMsg = ({ extras }: Data) => {
    let { sideLength }: { sideLength: number[] | undefined } = extras

    if (sideLength?.length && sideLength.length < 2) {
      return `${Sidelength} 1: ${sideLength[0]}inch`;
    } else if (sideLength?.length && sideLength.length > 1) {
      return `${Sidelength} 1: ${sideLength[0]}inch\n${Sidelength} 2: ${sideLength[1]}inch`;
    }
  }

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/roundcloth', { amount, diameter, fabricWidth, fabricAmount, type }, locale);
    if (status !== 200) {
      setResult(data.message!);
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
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{Roundcloth}</h2>
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
            <Form.Check inline type='radio' label={Marrow} name='type' onClick={() => setType(SideType.Marrow)} />
            <Form.Check inline type='radio' label={Hemmed} name='type' onClick={() => setType(SideType.Hemmed)} />
        </div>
        <FormInput label={Amount} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={Diameter} className='mb-3' controlId='diameter' onChange={(e) => setDiameter(+e.target.value)} />
        <FormInput label={Fabric_Width} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormInput label={Fabric_Amount} className='mb-3' controlId='fabric-amount' onChange={(e) => setFabricAmount(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={Calculate} clearLabel={Clear} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Roundcloth