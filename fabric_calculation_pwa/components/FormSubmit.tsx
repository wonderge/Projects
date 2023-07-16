import { MouseEventHandler } from "react";
import { Button, Col, Row } from "react-bootstrap";

type FormSubmitProps = {
  className?: string,
  calculateLabel: string,
  clearLabel: string,
  onClear: MouseEventHandler<HTMLButtonElement>,
}

const FormSubmit = ({ className ,calculateLabel, clearLabel, onClear }: FormSubmitProps) => {
  return (
    <Row className={className}>
      <Col className="text-center"><Button type="submit">{calculateLabel}</Button></Col>
      <Col className="text-center"><Button onClick={onClear}>{clearLabel}</Button></Col>
    </Row>
  )
}

export default FormSubmit;