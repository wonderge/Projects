import { NextPage } from "next";
import { Card, Container } from "react-bootstrap";
import { PageProp } from "../models/PageProp";

const Offline: NextPage<PageProp> = ({ labels }) => {
  const { Offline } = labels;
  return (
    <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
      <Card className='p-1'>
        <Card.Body>
          <p>{Offline}</p>
        </Card.Body>
      </Card>
      </div>
    </Container>
  )
}

export default Offline