import Link from "next/link"
import { ReactNode } from "react"
import { Button } from "react-bootstrap"

const ButtonLink = ({ className, href, children }: { className?: string, href: string, children?: ReactNode }) => {
  return (
    <Link href={href}><Button className={className}>{children}</Button></Link>
  )
}

export default ButtonLink