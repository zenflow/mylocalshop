const express = require('express')
const {adminGraphql} = require('./adminGraphql')

const server = express()

function getRole(user) {
  if (!user) {
    return 'anonymous'
  }
  if (user.email === 'zenflow87@gmail.com') {
    return 'admin'
  }
  return 'user'
}

server.get('/auth-hook', async (req, res) => {
  try {
    let user

    const sessionId = req.get('Authorization')
    if (sessionId) {
      user = await queryUserBySessionId(sessionId, 'id email')
      if (!user) {
        console.warn(`Could not find user by session id "${sessionId}"`)
      }
    }

    const result = {
      'X-Hasura-Role': getRole(user),
      'X-Hasura-User-Id': user && user.id,
    }

    res.json(result)
    console.log({user, result})
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

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
  const {data} = await adminGraphql(query, {sessionId})
  return data.sessions_by_pk.user
}

module.exports = server
