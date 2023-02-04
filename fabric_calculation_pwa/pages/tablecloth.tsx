import type { NextPage } from 'next'
import { useRef, FormEvent, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import CardContainer from '../components/CardContainer'
import TextWrap from '../components/TextWrap'
import { PageProps } from '../types/PageProps'
import { SideType } from '../types/SideType'
import fetchApi from '../utils/helpers/fetchApi'

const Tablecloth: NextPage<PageProps> = ({ locale, labels }) => {
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [fabricWidth, setFabricWidth] = useState(0);
  const [fabricAmount, setFabricAmount] = useState(0);
  const [joints, setJoints] = useState(0);
  const [type, setType] = useState('');
  const [result, setResult] = useState('');
  const form = useRef<HTMLFormElement>(null)
  const { Amount, Length, Width, Fabric_Width, Fabric_Amount, Marrow, Hemmed, Tablecloth, No_Joints, One_Joint, Two_Joints, Calculate, Clear } = labels;

  const calculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchApi('/api/tablecloth', { amount, length, width, fabricWidth, fabricAmount, type, joints }, locale);
    if (res.message) {
      setResult(res.message);
    } else if (res.amount !== undefined) {
      setResult(`${res.amount}pcs`);
    } else {
      setResult(`${res.yards}y\n${res.meters}m`);
    }
  }

  const clear = () => {
    form.current!.reset();
    setAmount(0);
    setLength(0);
    setWidth(0);
    setFabricWidth(0);
    setFabricAmount(0);
  }

  return (
    <CardContainer>
      <h2 className='text-center'>{Tablecloth}</h2>
      <Form onSubmit={calculate} ref={form}>
        <div className='text-center'>
          <Form.Check inline type='radio' label={Marrow} name='type' onClick={() => setType(SideType.Hemmed)} />
          <Form.Check inline type='radio' label={Hemmed} name='type' onClick={() => setType(SideType.Marrow)} />
        </div>
        <div className='text-center'>
          <Form.Check inline type='radio' label={No_Joints} name='joints' onClick={() => setJoints(0)} />
          <Form.Check inline type='radio' label={One_Joint} name='joints' onClick={() => setJoints(1)} />
          <Form.Check inline type='radio' label={Two_Joints} name='joints' onClick={() => setJoints(2)} />
        </div>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>{Amount}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setAmount(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="length">
          <Form.Label>{Length}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setLength(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="width">
          <Form.Label>{Width}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setWidth(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fabric-width">
          <Form.Label>{Fabric_Width}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setFabricWidth(+e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fabric-amount">
          <Form.Label>{Fabric_Amount}</Form.Label>
          <Form.Control type="number" step="any" onChange={(e) => setFabricAmount(+e.target.value)} />
        </Form.Group>
        <Row className='mb-3'>
          <Col className='text-center'><Button type='submit'>{Calculate}</Button></Col>
          <Col className='text-center'><Button onClick={clear}>{Clear}</Button></Col>
        </Row>
        <TextWrap>{result}</TextWrap>
      </Form>
    </CardContainer>
  )
}

export default Tablecloth