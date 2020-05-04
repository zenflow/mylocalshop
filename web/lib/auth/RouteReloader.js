import { useEffect } from 'react'
import Router from 'next/router'
import { useCurrentUser } from './useCurrentUser'
import { getSessionCookie, useSessionCookie } from './session-cookie'

let lastCurrentUser

/* Responsible for reloading the route (i.e. causing getInitialProps) when authentication status changes.
  Necessary so that new apollo & react-admin clients are created for the new authentication status. */
export function RouteReloader () {
  if (process.browser) {
    const currentUser = useCurrentUser()
    const shouldRefresh = lastCurrentUser && !currentUser
    useEffect(() => {
      if (shouldRefresh) {
        console.log('User logged out. Refreshing page.')
        Router.replace(Router.route, Router.asPath)
      }
    })
    lastCurrentUser = currentUser

    const sessionCookie = useSessionCookie()
    useEffect(() => {
      const focusHandler = () => {
        if (getSessionCookie()?.id !== sessionCookie?.id) {
          console.log('Session ID changed while focus was blurred. Refreshing page.')
          Router.replace(Router.route, Router.asPath)
        }
      }
      window.addEventListener('focus', focusHandler)
      return () => window.removeEventListener('focus', focusHandler)
    }, [sessionCookie?.id])
  }
  return null
}
