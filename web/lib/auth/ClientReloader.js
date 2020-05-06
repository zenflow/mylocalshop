import { useEffect, useRef } from 'react'
import Router from 'next/router'
import { useCurrentUser } from './useCurrentUser'
import { getSessionCookie, removeSessionCookie, useSessionCookie } from './session-cookie'
import { clearApolloClient } from '../apollo/apollo-client'
import { clearAdminClient } from '../react-admin/admin-client'

const reloadClients = () => {
  clearApolloClient()
  clearAdminClient()
  Router.replace(Router.route, Router.asPath)
}

export function ClientReloader () {
  if (!process.browser) {
    return null
  }
  const currentUser = useCurrentUser()
  const sessionCookie = useSessionCookie()

  useEffect(() => {
    if (sessionCookie && !currentUser) {
      console.log('Session no longer exists. Reloading clients.')
      if (getSessionCookie()) {
        removeSessionCookie()
      }
      reloadClients()
    }
  })

  const lastCurrentUser = useRef(currentUser)
  useEffect(() => {
    if (
      (lastCurrentUser.current && currentUser) &&
      (lastCurrentUser.current.isAdmin !== currentUser.isAdmin)
    ) {
      console.log(`Permissions changed (isAdmin = ${currentUser.isAdmin}). Reloading clients.`)
      reloadClients()
    }
    lastCurrentUser.current = currentUser
  })

  useEffect(() => {
    const focusHandler = () => {
      if (getSessionCookie()?.id !== sessionCookie?.id) {
        console.log('Session ID changed while focus was blurred. Reloading clients.')
        reloadClients()
      }
    }
    window.addEventListener('focus', focusHandler)
    return () => window.removeEventListener('focus', focusHandler)
  }, [sessionCookie?.id])

  return null
}
