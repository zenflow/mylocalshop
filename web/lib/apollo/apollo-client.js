import { createApolloClient } from './createApolloClient'

const clients = {}

export function getApolloClient (initialState, auth) {
  const sessionId = auth.session?.id
  if (!process.browser) {
    return createApolloClient(sessionId)
  }
  let client = clients[auth.version]
  if (client) {
    return client
  }
  Object.entries(clients)
    .filter(([, oldClient]) => !oldClient.stopped)
    .forEach(([oldVersion, oldClient]) => {
      oldClient.stop()
      oldClient.link.subscriptionClient.close()
      oldClient.stopped = true
      console.log('stopped apollo client for auth version', oldVersion)
    })
  client = createApolloClient(sessionId)
  client.cache.restore(initialState)
  clients[auth.version] = client
  console.log('created apollo client for auth', auth)
  return client
}
