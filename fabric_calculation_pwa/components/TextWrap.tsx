import { ReactNode } from "react";

const TextWrap = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-center" style={{ whiteSpace: "pre" }}>{children}</div>
  )
}

export default TextWrap;