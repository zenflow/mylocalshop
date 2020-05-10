import fetch from 'isomorphic-unfetch'
import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import { getSessionCookie, removeSessionCookie } from './session-cookie'

export const AuthContext = React.createContext()

export const useAuth = () => React.useContext(AuthContext)

export function withAuth (AppComponent) {
  const WithAuth = ({ auth, ...props }) => {
    return (
      <AuthContext.Provider value={auth}>
        <AppComponent {...props} />
      </AuthContext.Provider>
    )
  }
  if (process.env.NODE_ENV !== 'production') {
    const displayName = AppComponent.displayName || AppComponent.name || 'Component'
    WithAuth.displayName = `withAuth(${displayName})`
  }
  WithAuth.getInitialProps = async ctx => {
    const sessionCookie = getSessionCookie(ctx.ctx.req)
    const auth = getAuth(sessionCookie)
    ctx.ctx.auth = ctx.auth = auth
    const getInitialProps = AppComponent.getInitialProps || App.getInitialProps
    const props = await getInitialProps(ctx)
    return { ...props, auth }
  }
  return WithAuth
}

let version = 1

function getAuth (sessionCookie) {
  return {
    version,
    isLoggedIn: !!sessionCookie,
    sessionId: sessionCookie?.id,
    userId: sessionCookie?.user.id,
    userRole: sessionCookie?.user.role ?? 'anonymous',
    isUserAdmin: sessionCookie?.user.role === 'admin',
    sessionCookie,
  }
}

export async function reloadAuth () {
  version++
  await Router.replace(Router.route, Router.asPath)
}

export async function logOut () {
  fetch('/api/auth/logout') // don't await response
  // wait for fetch request to go out before removing session cookie
  await Promise.resolve()
  console.log('Sent logout request. Reloading auth.')
  removeSessionCookie()
  await reloadAuth()
}
