import type { NextPage } from 'next'
import { Container, Card, Form, Image, Row, Col, Button } from 'react-bootstrap'

const Chaircover: NextPage = () => {
  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className='p-1'>
          <Card.Body>
            <h2 className='text-center'>Chair Cover</h2>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="a">
                    <Form.Label>A</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="b">
                    <Form.Label>B</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
                <Col className='text-center'><Image src='/chaircover.png' width={140} /></Col>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="c">
                  <Form.Label>C</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="d">
                  <Form.Label>D</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="e">
                  <Form.Label>E</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="f">
                  <Form.Label>F</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="g">
                  <Form.Label>G</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="h">
                  <Form.Label>H</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" className='mr-3 pr-3' />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="fabric-width">
                  <Form.Label>Fabric Width</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Row>
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

export default Chaircover