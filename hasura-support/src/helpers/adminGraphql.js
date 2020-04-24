// Note: there's an identical file in web/lib/

const fetch = require('isomorphic-unfetch')
module.exports = { adminGraphql }

async function adminGraphql (query, variables) {
  const endpoint = `${process.env.HASURA_ENGINE_ENDPOINT}/v1/graphql`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Admin-Secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: 'cors',
  })

  if (!response.ok) {
    throw new Error(`adminGraphql: Network error, received status code ${response.status}`)
  }

  const result = await response.json()

  if (result.errors && result.errors.length) {
    console.error({ query, variables, result })
    throw new Error(`adminGraphql: ${result.errors[0].message}`)
  }

  return result
}
