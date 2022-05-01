import type { NextPage } from 'next'
import { Card, Container, Form } from 'react-bootstrap'

const Home: NextPage = () => {
  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
          </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Home
