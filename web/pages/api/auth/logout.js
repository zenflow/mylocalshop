import { getSessionCookie, removeSessionCookie } from '../../../lib/session-cookie'
import { adminGraphql } from '../../../lib/adminGraphql'

export default async (req, res) => {
  const sessionCookie = getSessionCookie(req)
  await deleteSession(sessionCookie.id)
  removeSessionCookie(res)
  res.writeHead(302, { Location: '/' })
  res.end()
}

async function deleteSession (sessionId) {
  const query = `
    mutation ($sessionId: uuid!) {
      delete_sessions(where: { id: { _eq: $sessionId } }) {
        __typename
      }
    }
  `
  await adminGraphql(query, { sessionId })
}
