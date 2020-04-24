// Note: there's an identical file in hasura-support/src/helpers/

import fetch from 'isomorphic-unfetch'
export { adminGraphql }

const endpoint = `${process.env.HASURA_ENGINE_ENDPOINT}/v1/graphql`
const secret = process.env.HASURA_GRAPHQL_ADMIN_SECRET

async function adminGraphql (query, variables) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Admin-Secret': secret,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error(`adminGraphql: Network error, received status code ${response.status}`)
  }

  const result = await response.json();

  if (result.errors && result.errors.length) {
    console.error({query, variables, result})
    throw new Error(`adminGraphql: ${result.errors[0].message}`)
  }

  return result
}
