import fetch from 'isomorphic-unfetch'
import { Client, QueryFetcher } from 'gqless'
import { schema, query_root } from './generated'

function getQueryFetcher(sessionId): QueryFetcher {
  return async (query, variables) => {
    const endpoint = `${process.env.HASURA_ENGINE_ENDPOINT}/v1/graphql`
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionId ? {'Authorization': sessionId} : {}),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`Network error, received status code ${response.status}`)
    }

    const json = await response.json();

    if (json.errors && json.errors.length) {
      throw new Error(json.errors[0].message)
    }

    return json
  }
}

export const createClient = (sessionId) =>
  new Client<query_root>(schema.query_root, getQueryFetcher(sessionId));
