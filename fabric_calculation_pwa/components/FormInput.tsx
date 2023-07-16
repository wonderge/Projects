import { ChangeEventHandler, ElementType } from "react";
import { Form } from "react-bootstrap"

type FormInputProps = {
  className?: string,
  controlId?: string,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  label: string,
  as?: ElementType<any>,
  innerClassName?: string
}

const FormInput = ({ className, controlId, onChange, label, as, innerClassName}: FormInputProps) => {
  return (
    <Form.Group as={as} className={className} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control className={innerClassName} type="number" step="any" onChange={onChange}/>
    </Form.Group>
  )
}

export default FormInput;