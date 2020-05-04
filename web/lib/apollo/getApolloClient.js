import { getSessionCookie } from '../auth/session-cookie'
import { createApolloClient } from './createApolloClient'

let lastSessionId
let lastApolloClient
let lastWsLink

export function getApolloClient (initialState, req) {
  const sessionId = getSessionCookie(req)?.id
  if (!process.browser) {
    const { apolloClient } = createApolloClient(sessionId)
    return apolloClient
  }
  if (lastApolloClient && (lastSessionId === sessionId)) {
    return lastApolloClient
  }
  const { apolloClient, wsLink } = createApolloClient(sessionId)
  if (lastApolloClient) {
    lastApolloClient.stop()
    lastWsLink.subscriptionClient.close()
  } else {
    // load initialState (only) on first call on browser, to have data from SSR
    apolloClient.cache.restore(initialState)
  }
  lastApolloClient && console.log(`killed apollo client for session ${lastSessionId}`)
  console.log(`created apollo client for session ${sessionId}`)
  lastSessionId = sessionId
  lastApolloClient = apolloClient
  lastWsLink = wsLink
  return apolloClient
}
