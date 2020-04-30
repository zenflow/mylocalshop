// Note: All dynamic routes should be added to filter in SimpleLink below!

import Link from 'next/link'

export const SimpleLink = ({ href, children }) => {
  let route = href
  if (href.startsWith('/admin/')) {
    route = '/admin/[...args]'
  }
  return (
    <Link href={route} as={href}>
      {children}
    </Link>
  )
}

export const SimpleLinkAnchor = ({ href, children, ...anchorProps }) => {
  return (
    <SimpleLink href={href}>
      <a href={href} {...anchorProps}>
        {children}
      </a>
    </SimpleLink>
  )
}
