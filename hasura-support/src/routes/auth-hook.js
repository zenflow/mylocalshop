const { adminGraphql } = require('../helpers/adminGraphql')

module.exports = server => {
  server.get('/auth-hook', async (req, res) => {
    try {
      let user

      const sessionId = req.get('Authorization')
      if (sessionId) {
        const now = (new Date()).toISOString()
        const { data } = await adminGraphql(`
          mutation ($sessionId: uuid!, $now: timestamptz) {
            update_sessions_by_pk(
              pk_columns: { id: $sessionId }, 
              _set: { lastUsedAt: $now }
            ) {
              user { id isAdmin }
            }
          }
        `, { sessionId, now })
        user = data.update_sessions_by_pk && data.update_sessions_by_pk.user
      }

      const result = {
        'X-Hasura-Role': user ? (user.isAdmin ? 'admin' : 'user') : 'anonymous',
        'X-Hasura-User-Id': user ? user.id : undefined,
      }

      // TODO: 'Cache-Control': `max-age=${60 * 60}`, // 1 hour

      res.json(result)
      console.log({ user, result })
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }
  })
}
