const express = require('express')

const server = express()

server.get('/auth-hook', (req, res) => {
  // const token = req.get('Authorization')
  // res.json({'X-Hasura-Role': 'user', 'X-Hasura-User-Id': '1'})
  const role = req.get('Authorization') === 'yes' ? 'admin' : 'anonymous'
  const vars = {'X-Hasura-Role': role}
  console.log(vars)
  res.json(vars)
})

module.exports = server
