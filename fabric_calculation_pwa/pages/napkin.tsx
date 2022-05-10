import type { NextPage } from 'next'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const Napkin: NextPage = () => {
  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>Napkin</h2>
            <Form>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="length">
                <Form.Label>Length</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="width">
                <Form.Label>Width</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fabric-width">
                <Form.Label>Fabric Width</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fabric-amount">
                <Form.Label>Fabric Amount</Form.Label>
                <Form.Control type="number" />
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

export default Napkin