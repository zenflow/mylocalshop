const { adminGraphql } = require('../helpers/adminGraphql')

module.exports = server => {
  server.get('/auth-hook', async (req, res) => {
    try {
      let user

      const sessionId = req.get('Authorization')
      if (sessionId) {
        user = await queryUserBySessionId(sessionId, 'id roleId')
        if (!user) {
          // TODO: return 4xx auth error, prompting user to create a new session
          //   mostly not necessary because session data is realtime & client should know session is expired
          console.warn(`Could not find user by session id "${sessionId}"`)
        }
      }

      const result = {
        'X-Hasura-Role': user ? user.roleId : 'anonymous',
        'X-Hasura-User-Id': user ? user.id : undefined,
        'Cache-Control': `max-age=${60 * 60}`, // 1 hour
      }

      res.json(result)
      console.log({ user, result })
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }
  })
}

async function queryUserBySessionId (sessionId, userQuery) {
  const query = `
    query ($sessionId: uuid!) {
      sessions_by_pk(id: $sessionId) {
        user {
          ${userQuery.trim()}
        }
      }
    }
  `
  const { data } = await adminGraphql(query, { sessionId })
  return data.sessions_by_pk && data.sessions_by_pk.user
}
