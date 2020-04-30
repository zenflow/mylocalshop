// Note: All dynamic routes should be added to filter in SimpleLink below!
import { forwardRef } from 'react'
import Link from 'next/link'

export const SimpleLink = ({ href, children }) => {
  let route = href
  // Note: All dynamic routes should be added to filter in SimpleLink here!
  if (href.startsWith('/admin/')) {
    route = '/admin/[...args]'
  }
  return (
    <Link href={route} as={href}>
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

export const LinkElement = forwardRef(({ element, href, ...props}, ref) => {
  const Element = element
  return (
    <SimpleLink href={href}>
      <Element ref={ref} href={href} {...props}/>
    </SimpleLink>
  )
})
