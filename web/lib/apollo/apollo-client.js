import { getSessionCookie } from '../auth/session-cookie'
import { createApolloClient } from './createApolloClient'

let apolloClient = null

export function getApolloClient (initialState, req) {
  const sessionId = getSessionCookie(req)?.id
  if (!process.browser) {
    return createApolloClient(sessionId)
  }
  if (!apolloClient) {
    apolloClient = createApolloClient(sessionId)
    apolloClient.cache.restore(initialState)
    console.log(`created apollo client for sessionId ${sessionId}`)
  }
  return apolloClient
}

// Client-side only
export function clearApolloClient () {
  if (apolloClient) {
    apolloClient.stop()
    apolloClient.link.subscriptionClient.close()
    apolloClient = null
    console.log('destroyed apollo client')
  }
}
