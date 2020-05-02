import nextConnect from 'next-connect'
import { passport } from '../../../../passport'
import { setSessionCookie } from '../../../../lib/session-cookie'

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
      const state = JSON.parse(req.query.state)
      const session = await authenticate('google', {
        failureRedirect: state.redirect || '/',
      }, req, res)
      setSessionCookie(res, session)
      res.writeHead(302, { Location: state.redirect || '/' })
      res.end()
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }
  })
