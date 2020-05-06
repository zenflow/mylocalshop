import { getSessionCookie } from '../../../lib/auth/session-cookie'
import { adminGraphql } from '../../../lib/adminGraphql'

export default async (req, res) => {
  const sessionCookie = getSessionCookie(req)
  await deleteSession(sessionCookie.id)
  res.status(200).end()
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
