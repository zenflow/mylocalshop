import { parse, serialize } from 'cookie'

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

function parseCookies (req) {
  if (process.browser) {
    return parse(window.document.cookie || '')
  }
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) {
    return req.cookies
  }
  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

// works on browser & server. ignores `req` on browser
export function getSessionCookie (req) {
  const cookies = parseCookies(req)
  const json = cookies[COOKIE_NAME]
  return json && JSON.parse(json)
}
