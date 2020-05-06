import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { WebSocketLink } from 'apollo-link-ws'
import fetch from 'isomorphic-unfetch'

export function createApolloClient (sessionId) {
  const uri = `${process.env.HASURA_ENGINE_ENDPOINT}/v1/graphql`
  const headers = sessionId ? { Authorization: sessionId } : {}

  return new ApolloClient({
    link: process.browser
      ? new WebSocketLink({
        uri: toWsUrl(uri),
        options: {
          reconnect: true,
          connectionParams: { headers },
        },
        webSocketImpl: WebSocket,
      })
      : new BatchHttpLink({ uri, fetch, headers }),
    cache: new InMemoryCache(),
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

const toWsUrl = url => {
  const parsedUrl = new URL(url)
  const secure = parsedUrl.protocol === 'https:'
  parsedUrl.protocol = secure ? 'wss:' : 'ws:'
  parsedUrl.port = parsedUrl.port || (secure ? 443 : 80)
  return parsedUrl.toString()
}
