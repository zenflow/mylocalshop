import { parse, serialize } from 'cookie'

const COOKIE_NAME = 'session'

export function setSessionCookie (value, res) {
  const cookie = serialize(COOKIE_NAME, JSON.stringify(value), {
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
  if (process.browser) {
    document.cookie = cookie
  } else {
    res.setHeader('Set-Cookie', cookie)
  }
}

export function removeSessionCookie (res) {
  const cookie = serialize(COOKIE_NAME, '', {
    maxAge: -1,
    path: '/',
  })
  if (process.browser) {
    document.cookie = cookie
  } else {
    res.setHeader('Set-Cookie', cookie)
  }
}

export function getSessionCookie (req) {
  const cookies = getCookies(req)
  const json = cookies[COOKIE_NAME]
  return json && JSON.parse(json)
}

function getCookies (req) {
  if (process.browser) {
    return parse(document.cookie || '')
  } else if (!req) {
    throw new Error('session-cookie: `req` argument is required server-side')
  } else if (req.cookies) {
    // For API Routes we don't need to parse the cookies.
    return req.cookies
  } else {
    // For pages we do need to parse the cookies.
    return parse(req.headers?.cookie || '')
  }
}
