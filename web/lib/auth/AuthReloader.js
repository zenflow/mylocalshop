import { useEffect, useRef } from 'react'
import { useCurrentUser } from './current-user-context'
import { getSessionCookie, removeSessionCookie, setSessionCookie } from './session-cookie'
import { reloadAuth, useAuth } from './auth-context'

export function AuthReloader () {
  if (!process.browser) {
    return null
  }

  const auth = useAuth()
  const currentUser = useCurrentUser()
  const lastCurrentUser = useRef(currentUser)

  useEffect(() => {
    if (auth.session && !currentUser) {
      console.log('Session removed from database. Reloading auth.')
      if (getSessionCookie()) {
        removeSessionCookie()
      }
      reloadAuth()
    }
    if (
      (lastCurrentUser.current && currentUser) &&
      (auth.session.user.is_admin !== currentUser.is_admin)
    ) {
      console.log(`Permissions changed (is_admin = ${currentUser.is_admin}). Reloading auth.`)
      const newSession = { ...auth.session, user: { ...auth.session.user, is_admin: currentUser.is_admin } }
      if (JSON.stringify(getSessionCookie()) !== JSON.stringify(newSession)) {
        setSessionCookie(newSession)
      }
      reloadAuth()
    }
    lastCurrentUser.current = currentUser
  })

  useEffect(() => {
    const focusHandler = () => {
      if (getSessionCookie()?.id !== auth.session?.id) {
        console.log('Session ID changed while focus was blurred. Reloading auth.')
        reloadAuth()
      }
    }
    window.addEventListener('focus', focusHandler)
    return () => window.removeEventListener('focus', focusHandler)
  }, [auth.session?.id])

  return null
}
