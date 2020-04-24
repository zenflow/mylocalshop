import nextConnect from 'next-connect'
import { passport } from '../../../../lib/auth/passport'

export default nextConnect()
  .use(passport.initialize())
  .get((req, res) => {
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      state: JSON.stringify({
        redirect: req.query.redirect,
      }),
    })(req, res)
  })
