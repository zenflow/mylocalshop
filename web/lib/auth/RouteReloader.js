import { useEffect } from 'react'
import Router from 'next/router'
import { useCurrentUser } from './useCurrentUser'
import { getSessionCookie, removeSessionCookie, useSessionCookie } from './session-cookie'

/* Responsible for reloading the route (i.e. causing getInitialProps) when authentication status changes.
  Necessary so that new apollo & react-admin clients are created for the new authentication status. */
export function RouteReloader () {
  if (process.browser) {
    const { currentUserLoading, currentUser } = useCurrentUser()
    const sessionCookie = useSessionCookie()
    const shouldRefresh = sessionCookie && !currentUser && !currentUserLoading
    useEffect(() => {
      if (shouldRefresh) {
        console.log('Session no longer exists. Refreshing page.')
        if (getSessionCookie()) {
          removeSessionCookie()
        }
        Router.replace(Router.route, Router.asPath)
      }
    })

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
