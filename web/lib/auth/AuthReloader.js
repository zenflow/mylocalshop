import { useEffect } from 'react'
import { useCurrentUser } from './current-user-context'
import { getSessionCookie, removeSessionCookie, setSessionCookie } from './session-cookie'
import { reloadAuth, useAuth } from './auth-context'

export function AuthReloader () {
  if (!process.browser) {
    return null
  }

  const { isLoggedIn, userRole, sessionCookie, sessionId } = useAuth()
  const currentUser = useCurrentUser()

  useEffect(() => {
    if (isLoggedIn && !currentUser) {
      console.log('Session removed from database. Reloading auth.')
      if (getSessionCookie()) {
        removeSessionCookie()
      }
      reloadAuth()
    }
    if (
      (isLoggedIn && currentUser) &&
      (userRole !== currentUser.role)
    ) {
      console.log(`Role changed from ${userRole} to ${currentUser.role}. Reloading auth.`)
      const newSessionCookie = { ...sessionCookie, user: { ...sessionCookie.user, role: currentUser.role } }
      if (JSON.stringify(getSessionCookie()) !== JSON.stringify(newSessionCookie)) {
        setSessionCookie(newSessionCookie)
      }
      reloadAuth()
    }
  })

  useEffect(() => {
    const focusHandler = () => {
      if (getSessionCookie()?.id !== sessionId) {
        console.log('Session ID changed while focus was blurred. Reloading auth.')
        reloadAuth()
      }
    }
    window.addEventListener('focus', focusHandler)
    return () => window.removeEventListener('focus', focusHandler)
  }, [sessionId])

  return null
}
