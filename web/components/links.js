import { forwardRef } from 'react'
import Link from 'next/link'
import { matchRoute } from '../matchRoute'

export const SimpleLink = ({ href, children }) => {
  return (
    <Link href={matchRoute(href)} as={href}>
      {children}
    </Link>
  )
}

export const LinkAnchor = forwardRef(({ href, ...props }, ref) => {
  return (
    <SimpleLink href={href}>
      <a ref={ref} href={href} {...props}/>
    </SimpleLink>
  )
})

export const LinkElement = forwardRef(({ element, href, ...props }, ref) => {
  const Element = element
  return (
    <SimpleLink href={href}>
      <Element ref={ref} href={href} {...props}/>
    </SimpleLink>
  )
})
