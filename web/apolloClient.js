import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from "apollo-link-batch-http"
import fetch from 'isomorphic-unfetch'
import { getSessionCookie } from './lib/auth/session-cookie'

export default function createApolloClient(initialState, req) {
  const sessionId = getSessionCookie(req)?.id // TODO: make this dynamic
  return new ApolloClient({
    link: new BatchHttpLink({
      uri: `${process.env.HASURA_ENGINE_ENDPOINT}/v1/graphql`,
      fetch,
      headers: sessionId ? { Authorization: sessionId } : {},
    }),
    cache: new InMemoryCache().restore(initialState),
    ssrMode: !process.browser,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only'
      },
    }
  })
}
