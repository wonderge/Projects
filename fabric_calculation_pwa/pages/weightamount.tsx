import type { NextPage } from 'next'
import { Container, Card, Form, Button, Col, Row } from 'react-bootstrap'

const WeightAmount: NextPage = () => {
  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>Weight and Amount</h2>
            <Form>
              <div className='text-center'>
                <Form.Check inline type='radio' label='Small tube' name='type' />
                <Form.Check inline type='radio' label='Big tube' name='type' />
              </div>
              <div className='text-center'>
                <Form.Check inline type='radio' label='Satin' name='fabric' />
                <Form.Check inline type='radio' label='Poplin' name='fabric' />
              </div>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fabric-amount">
                <Form.Label>Fabric Amount</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Row className='mb-3'>
                <Col className='text-center'><Button>Calculate</Button></Col>
                <Col className='text-center'><Button>Clear</Button></Col>
              </Row>
              <div className='text-center'>Result</div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default WeightAmount