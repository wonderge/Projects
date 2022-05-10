import type { NextPage } from 'next'
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap'

const Screen: NextPage = () => {
  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>Gauze</h2>
            <div className='text-center'>
              <Form.Check inline type='radio' label='No cut' name='type' />
              <Form.Check inline type='radio' label='Cut' name='type' />
            </div>
            <div className='text-center'>
              <Form.Check inline type='radio' label='1x pleat' name='joints' />
              <Form.Check inline type='radio' label='1.5x pleat' name='joints' />
              <Form.Check inline type='radio' label='2x pleat' name='joints' />
              <Form.Check inline type='radio' label='2.5x pleat' name='joints' />
              <Form.Check inline type='radio' label='3x pleat' name='joints' />
              <Form.Check inline type='radio' label='3.5x pleat' name='joints' />
            </div>
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

export default Screen