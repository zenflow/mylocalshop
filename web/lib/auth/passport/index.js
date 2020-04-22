import passport from 'passport'
import { googleStrategy } from './google-strategy'

passport.use(googleStrategy)

export {passport}
