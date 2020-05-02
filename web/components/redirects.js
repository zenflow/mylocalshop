import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function Redirect ({ to, action = 'push' }) {
  const router = useRouter()
  to = Array.isArray(to) ? `${to[0]}?${new URLSearchParams(to[1])}` : to
  useEffect(() => {
    router[action](to)
  })
  return <></>
}
