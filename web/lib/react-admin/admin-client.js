import hasuraDataProvider from '@zen_flow/ra-data-hasura'
import { convertLegacyDataProvider, createAdminStore } from 'react-admin'
import { getHistory } from './history'

const clients = {}

export function getAdminClient (auth) {
  let client = clients[auth.version]
  if (client) {
    return client
  }
  const dataProvider = convertLegacyDataProvider(
    hasuraDataProvider(
      process.env.HASURA_ENGINE_ENDPOINT,
      { 'Content-Type': 'application/json', ...(auth.sessionId ? { Authorization: auth.sessionId } : {}) },
    ),
  )
  const adminStore = createAdminStore({ authProvider, dataProvider, history: getHistory() })
  client = { adminStore, dataProvider, authProvider }
  clients[auth.version] = client
  console.log('created react-admin client for auth', auth)
  return client
}

const authProvider = {
  async login (params) {},
  async logout (params) {},
  async checkAuth (params) {},
  async checkError (error) {}, // eslint-disable-line handle-callback-err
  async getPermissions (params) {},
}
