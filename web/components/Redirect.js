import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function Redirect ({ to, action = 'push' }) { // TODO: prop types
  const router = useRouter()
  to = Array.isArray(to) ? `${to[0]}?${new URLSearchParams(to[1])}` : to
  useEffect(() => {
    router[action](to)
  })
  return <></>
}

export function RedirectToLogin () {
  const router = useRouter()
  return <Redirect to={['/login', { redirect: router.asPath }]} action="replace"/>
}
