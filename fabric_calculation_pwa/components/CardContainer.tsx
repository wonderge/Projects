import { ReactNode } from "react";
import { Card, Container } from "react-bootstrap";

const CardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className="p-1 gray">
          <Card.Body>
            {children}
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default CardContainer;