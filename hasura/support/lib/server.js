const pg = require('pg')
const express = require('express')

{
  async function doQuery (...args) {
    const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
    client.connect()
    const result = await client.query(...args)
    client.end()
    return result
  }

  const query = 'SELECT * FROM "public"."users"'
  doQuery(query)
    .then(({rows}) => {
      console.log('query:', query)
      console.log('rows:', rows)
    })
}

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
