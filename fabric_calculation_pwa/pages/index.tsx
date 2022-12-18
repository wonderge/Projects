import type { NextPage } from 'next'
import { Row, Col } from 'react-bootstrap'
import ButtonLink from '../components/ButtonLink'
import CardContainer from '../components/CardContainer'
import { PageProps } from '../models/PageProps'

const Home: NextPage<PageProps> = ({ labels }) => {
  const { Napkin, Tablecloth, Roundcloth, Sash, Clip, Chaircover, Curtain, Gauze, Flower, Button_Curtain, Weight_And_Amount } = labels;
  return (
    <CardContainer>
      <Row className='mb-3'>
        <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/napkin'>{Napkin}</ButtonLink></Col>
        <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/tablecloth'>{Tablecloth}</ButtonLink></Col>
      </Row>
      <Row className='mb-3'>
        <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/roundcloth'>{Roundcloth}</ButtonLink></Col>
        <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/sash'>{Sash}</ButtonLink></Col>
      </Row>
      <Row className='mb-3'>
        <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/clip'>{Clip}</ButtonLink></Col>
        <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/chaircover'>{Chaircover}</ButtonLink></Col>
      </Row>
      <Row className='mb-3'>
        <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/curtain'>{Curtain}</ButtonLink></Col>
        <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/gauze'>{Gauze}</ButtonLink></Col>
      </Row>
      <Row className='mb-3'>
        <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/flower'>{Flower}</ButtonLink></Col>
        <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/buttoncurtain'>{Button_Curtain}</ButtonLink></Col>
      </Row>
      <Row>
        <Col className='text-center'><ButtonLink href='/weightamount'>{Weight_And_Amount}</ButtonLink></Col>
      </Row>
    </CardContainer>
  )
}

export default Home