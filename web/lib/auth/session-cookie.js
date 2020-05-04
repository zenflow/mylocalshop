import { parse, serialize } from 'cookie'
import React from 'react'
import App from 'next/app'

const COOKIE_NAME = 'session'

// server-side only
export function setSessionCookie (res, value) {
  const cookie = serialize(COOKIE_NAME, JSON.stringify(value), {
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
  res.setHeader('Set-Cookie', cookie)
}

// server-side only
export function removeSessionCookie (res) {
  const cookie = serialize(COOKIE_NAME, '', {
    maxAge: -1,
    path: '/',
  })
  res.setHeader('Set-Cookie', cookie)
}

// works on browser & server. ignores `req` on browser
export function getSessionCookie (req) {
  let cookies
  if (process.browser) {
    cookies = parse(window.document.cookie || '')
  } else if (!req) {
    throw new Error('session-cookie: `req` argument is required server-side')
  } else if (req.cookies) {
    // For API Routes we don't need to parse the cookies.
    cookies = req.cookies
  } else {
    // For pages we do need to parse the cookies.
    cookies = parse(req.headers?.cookie || '')
  }
  const json = cookies[COOKIE_NAME]
  return json && JSON.parse(json)
}

export const useSessionCookie = () => React.useContext(SessionCookieContext)
export const SessionCookieContext = React.createContext()
export function withSessionCookie (AppComponent) {
  const WithSessionCookie = ({ sessionCookie, ...appProps }) => {
    return (
      <SessionCookieContext.Provider value={sessionCookie}>
        <AppComponent {...appProps} />
      </SessionCookieContext.Provider>
    )
  }
  if (process.env.NODE_ENV !== 'production') {
    const displayName = AppComponent.displayName || AppComponent.name || 'Component'
    WithSessionCookie.displayName = `withSessionCookie(${displayName})`
  }
  WithSessionCookie.getInitialProps = async ctx => {
    const sessionCookie = getSessionCookie(ctx.ctx.req)
    const getInitialProps = AppComponent.getInitialProps || App.getInitialProps
    const props = await getInitialProps(ctx)
    return { ...props, sessionCookie }
  }
  return WithSessionCookie
}
