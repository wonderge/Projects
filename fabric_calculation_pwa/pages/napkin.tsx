import type { NextPage } from 'next'
import { FormEvent, useRef, useState } from 'react'
import { Alert, Form} from 'react-bootstrap'
import CardContainer from '../components/CardContainer';
import TextWrap from '../components/TextWrap';
import { PageProps } from '../types/PageProps';
import { SideType } from '../types/SideType';
import fetchApi from '../utils/helpers/fetchApi';
import FormSubmit from '../components/FormSubmit';
import FormInput from '../components/FormInput';

const Napkin: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [fabricAmount, setFabricAmount] = useState(0);
  const [type, setType] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const { Amount, Length, Width, Fabric_Width, Fabric_Amount, Hemmed, Marrow, Napkin, Calculate, Clear } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { status, data } = await fetchApi('/api/napkin', { amount, length, width, fabricWidth, fabricAmount, type }, locale);
    if (status !== 200) {
      setError(data.message!);
    } else if (data.hasOwnProperty('amount')) {
      setResult(`${data.amount}pcs`);
    } else {
      setResult(`${data.yards}y\n${data.meters}m`);
    }
  }

  const clear = (): void => {
    form.current!.reset();
    setAmount(0);
    setLength(0);
    setWidth(0);
    setFabricWidth(0);
    setFabricAmount(0);
    setResult('');
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{Napkin}</h2>
      {error !== '' ? (<Alert variant='danger'>{error}</Alert>): '' }
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={Marrow} name='type' onClick={() => setType(SideType.Marrow)} />
          <Form.Check inline type='radio' label={Hemmed} name='type' onClick={() => setType(SideType.Hemmed)} />
        </div>
        <FormInput label={Amount} className='mb-3' controlId='amount' onChange={(e) => setAmount(+e.target.value)} />
        <FormInput label={Length} className='mb-3' controlId='length' onChange={(e) => setLength(+e.target.value)} />
        <FormInput label={Width} className='mb-3' controlId='width' onChange={(e) => setWidth(+e.target.value)} />
        <FormInput label={Fabric_Width} className='mb-3' controlId='fabric-width' onChange={(e) => setFabricWidth(+e.target.value)} />
        <FormInput label={Fabric_Amount} className='mb-3' controlId='fabric-amount' onChange={(e) => setFabricAmount(+e.target.value)} />
        <FormSubmit className='mb-3' calculateLabel={Calculate} clearLabel={Clear} onClear={clear} />
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Napkin