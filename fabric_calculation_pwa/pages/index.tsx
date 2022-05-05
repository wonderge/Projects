import type { NextPage } from 'next'
import { Card, Container, Row, Col } from 'react-bootstrap'
import ButtonLink from '../components/ButtonLink'

const Home: NextPage = () => {
  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <Row className='mb-3'>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/napkin'>Napkin</ButtonLink></Col>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/tablecloth'>Tablecloth</ButtonLink></Col>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/roundcloth'>Roundcloth</ButtonLink></Col>
            </Row>
            <Row className='mb-3'>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/sash'>Sash</ButtonLink></Col>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/clip'>Clip</ButtonLink></Col>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/chaircover'>Chaircover</ButtonLink></Col>
            </Row>
            <Row className='mb-3'>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/curtain'>Curtain</ButtonLink></Col>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/screen'>Screen</ButtonLink></Col>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/flower'>Flower</ButtonLink></Col>
            </Row>
            <Row>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/buttoncurtain'>Button Curtain</ButtonLink></Col>
              <Col className='d-flex'><ButtonLink className='flex-grow-1' href='/weightamount'>Weight and Amount</ButtonLink></Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Home