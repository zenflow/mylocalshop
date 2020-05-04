import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import fetch from 'isomorphic-unfetch'

export function createApolloClient (sessionId) {
  const uri = `${process.env.HASURA_ENGINE_ENDPOINT}/v1/graphql`
  const headers = sessionId ? { Authorization: sessionId } : {}

  let link = new BatchHttpLink({ uri, fetch, headers })

  let wsLink
  if (process.browser) {
    const httpLink = link
    wsLink = new WebSocketLink({
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

  const apolloClient = new ApolloClient({
    link,
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

  return { apolloClient, wsLink }
}

const toWsUrl = url => {
  const parsedUrl = new URL(url)
  const secure = parsedUrl.protocol === 'https:'
  parsedUrl.protocol = secure ? 'wss:' : 'ws:'
  parsedUrl.port = parsedUrl.port || (secure ? 443 : 80)
  return parsedUrl.toString()
}