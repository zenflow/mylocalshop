const express = require('express')

const server = express()

server.get('/auth-hook', async (req, res) => {
  const role = req.get('Authorization') === 'yes' ? 'admin' : 'anonymous'
  const vars = {
    'X-Hasura-Role': role,
    // 'X-Hasura-User-Id': '1',
  }
  console.log(vars)
  res.json(vars)
})

module.exports = server
