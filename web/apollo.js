import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import fetch from 'isomorphic-unfetch'
import { getSessionCookie } from './lib/session-cookie'
import { createWithApollo } from './lib/apollo'

const toWsUrl = url => {
  const parsedUrl = new URL(url)
  parsedUrl.protocol = parsedUrl.protocol === 'https' ? 'wss' : 'ws'
  parsedUrl.port = parsedUrl.port || 80
  return parsedUrl.toString()
}

function createApolloClient (initialState, req) {
  const uri = `${process.env.HASURA_ENGINE_ENDPOINT}/v1/graphql`

  // TODO: make this dynamic
  const sessionId = getSessionCookie(req)?.id
  const headers = sessionId ? { Authorization: sessionId } : {}

  let link = new BatchHttpLink({ uri, fetch, headers })

  if (process.browser) {
    const httpLink = link
    const wsLink = new WebSocketLink({
      uri: toWsUrl(uri),
      options: {
        reconnect: true,
        connectionParams: { headers },
      },
      webSocketImpl: WebSocket,
    })
    const test = ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    }
    link = split(test, wsLink, httpLink)
  }

  return new ApolloClient({
    link,
    cache: new InMemoryCache().restore(initialState),
    ssrMode: !process.browser,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  })
}

export const withApollo = createWithApollo({ createApolloClient })
