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
      // const redirect = JSON.parse(req.query.state).redirect // Not needed for login via popup
      const session = await authenticate('google', {
        // failureRedirect: ?, // TODO
      }, req, res)
      setSessionCookie(res, session)
      res.status(200)
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.send('<html><head></head><body><script type="text/javascript">window.close()</script></body></html>')
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }
  })
