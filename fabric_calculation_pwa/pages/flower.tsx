import type { NextPage } from 'next'
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap'

const Flower: NextPage = () => {
  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>Flower</h2>
            <Form>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="80cm">
                  <Form.Label>80cm</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="70cm">
                  <Form.Label>70cm</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="60cm">
                  <Form.Label>60cm</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="50cm">
                  <Form.Label>50cm</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="40cm">
                  <Form.Label>40cm</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="30cm">
                  <Form.Label>30cm</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="20cm">
                  <Form.Label>20cm</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="15cm">
                  <Form.Label>15cm</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Row>
              <div className='d-flex justify-content-center'>
                <Form.Group className="mb-3" controlId="10cm">
                  <Form.Label>10cm</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' />
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="length">
                <Form.Label>Length</Form.Label>
                <Form.Control type="number" className='mr-3 pr-3' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="width">
                <Form.Label>Width</Form.Label>
                <Form.Control type="number" className='mr-3 pr-3' />
              </Form.Group>
              <Row>
                <Col className='text-center'><Button>Calculate</Button></Col>
                <Col className='text-center'><Button>Clear</Button></Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Flower