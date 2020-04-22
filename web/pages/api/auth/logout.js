import { removeSessionCookie } from '../../../lib/auth/session-cookie'

export default (req, res) => {
  removeSessionCookie(res)
  res.writeHead(302, { Location: '/' })
  res.end()
}
