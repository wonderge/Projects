import React from "react";
import { ChangeEventHandler, ElementType } from "react";
import { Form } from "react-bootstrap"

type FormInputProps = {
  className?: string,
  controlId?: string,
  label: string,
  as?: ElementType<any>,
  innerClassName?: string,
  innerRef?: any,
  [rest: string]: any
}

const FormInput = ({ className, controlId, label, as, innerClassName, innerRef, ...rest}: FormInputProps) => {
  return (
    <Form.Group as={as} className={className} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control className={innerClassName} type="number" step="any" {...rest} ref={innerRef}/>
    </Form.Group>
  )
}

export default React.forwardRef((props: any, ref: any) => {
  return <FormInput {...props} innerRef={ref} />
})
  