import type { NextPage } from 'next'
import { Card, Container, Row, Col } from 'react-bootstrap'
import ButtonLink from '../components/ButtonLink'
import { PageProp } from '../models/PageProp'

const Home: NextPage<PageProp> = ({ labels }) => {
  const { Napkin, Tablecloth, Roundcloth, Sash, Clip, Chaircover, Curtain, Gauze, Flower, Button_Curtain, Weight_And_Amount } = labels;
  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
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
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Home