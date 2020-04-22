import nextConnect from 'next-connect'
import { passport } from '../../../../lib/auth/passport'

export default nextConnect()
  .use(passport.initialize())
  .get(passport.authenticate('google', { scope: ['email', 'profile'] }))
