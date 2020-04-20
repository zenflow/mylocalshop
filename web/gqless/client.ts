import fetch from 'isomorphic-unfetch'
import { Client, QueryFetcher } from 'gqless'
import { schema, query_root } from './generated'

const endpoint = process.env.HASURA_GRAPHQL_ENDPOINT;

const fetchQuery: QueryFetcher = async (query, variables) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'yes',
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
};

export const createClient = () => new Client<query_root>(schema.query_root, fetchQuery);

export const client = createClient();

export const query = client.query;
