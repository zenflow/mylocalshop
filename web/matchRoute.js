// Note: All dynamic routes should be added below!

export function matchRoute (href) {
  let route = href
  if (href.startsWith('/admin/')) {
    route = '/admin/[...args]'
  }
  return route
}
