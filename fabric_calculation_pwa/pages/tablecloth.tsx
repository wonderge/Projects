import type { NextPage } from 'next'
import { Card, Container, Form } from 'react-bootstrap'

const Tablecloth: NextPage = () => {
  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>Tablecloth</h2>
            <Form>
              <div className='text-center'>
                <Form.Check inline type='radio' label='Marrow' name='type' />
                <Form.Check inline type='radio' label='Hemmed' name='type' />
              </div>
              <div className='text-center'>
                <Form.Check inline type='radio' label='No joints' name='joints' />
                <Form.Check inline type='radio' label='One joint' name='joints' />
                <Form.Check inline type='radio' label='Two joints' name='joints' />
              </div>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Length</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Width</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Fabric Width</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Fabric Amount</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Tablecloth