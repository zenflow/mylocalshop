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
