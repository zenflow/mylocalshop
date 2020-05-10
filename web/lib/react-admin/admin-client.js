import hasuraDataProvider from '@zen_flow/ra-data-hasura'
import { convertLegacyDataProvider, createAdminStore } from 'react-admin'
import { resourcesMeta } from '../../resources/_meta'
import { getHistory } from './history'

const clients = {}

export function getAdminClient (auth) {
  let client = clients[auth.version]
  if (client) {
    return client
  }
  const baseDataProvider = hasuraDataProvider(
    process.env.HASURA_ENGINE_ENDPOINT,
    { 'Content-Type': 'application/json', ...(auth.sessionId ? { Authorization: auth.sessionId } : {}) },
  )
  const dataProvider = convertLegacyDataProvider((type, resource, params) => {
    const resourceMeta = resourcesMeta[resource]
    if (resourceMeta.hasCreatedByField && (type === 'CREATE')) {
      params.data.created_by = auth.userId ?? null
    }
    if (resourceMeta.hasUpdatedByField && ['CREATE', 'UPDATE'].includes(type)) {
      params.data.updated_by = auth.userId ?? null
    }
    return baseDataProvider(type, resource, params)
  })
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
