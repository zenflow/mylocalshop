import nextConnect from 'next-connect'
import { passport } from '../../../../lib/auth/passport'
import { setSessionCookie } from '../../../../lib/auth/session-cookie'

const authenticate = (method, options, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, options, (error, token) => {
      if (error) reject(error)
      else resolve(token)
    })(req, res)
  })

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    try {
      // TODO: redirect failure somewhere that exists
      const session = await authenticate('google', {failureRedirect: '/login'}, req, res)
      setSessionCookie(res, session)
      res.writeHead(302, { Location: '/' })
      res.end()
    } catch (error) {
      console.error(error)
      // TODO: redirect to error page
      res.status(500).send(error.message)
    }
  })
