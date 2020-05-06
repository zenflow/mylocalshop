import hasuraDataProvider from '@zen_flow/ra-data-hasura'
import { convertLegacyDataProvider, createAdminStore } from 'react-admin'
import { resourcesMeta } from '../../resources/_meta'
import { getHistory } from './history'

let adminClient = null

export function clearAdminClient () {
  adminClient = null
}

export function getAdminClient (sessionCookie) {
  if (adminClient) {
    return adminClient
  }
  const sessionId = sessionCookie?.id
  const currentUserId = sessionCookie?.userId ?? null
  const baseDataProvider = hasuraDataProvider(
    process.env.HASURA_ENGINE_ENDPOINT,
    { 'Content-Type': 'application/json', ...(sessionId ? { Authorization: sessionId } : {}) },
  )
  const dataProvider = convertLegacyDataProvider((type, resource, params) => {
    const resourceMeta = resourcesMeta[resource]
    if (resourceMeta.hasCreatedByField && (type === 'CREATE')) {
      params.data.createdBy = currentUserId
    }
    if (resourceMeta.hasUpdatedByField && ['CREATE', 'UPDATE'].includes(type)) {
      params.data.updatedBy = currentUserId
    }
    return baseDataProvider(type, resource, params)
  })
  const adminStore = createAdminStore({ authProvider, dataProvider, history: getHistory() })
  adminClient = { adminStore, dataProvider, authProvider }
  console.log(`created react-admin client for session ${sessionId}`)
  return adminClient
}

const authProvider = {
  async login (params) {},
  async logout (params) {},
  async checkAuth (params) {},
  async checkError (error) {}, // eslint-disable-line handle-callback-err
  async getPermissions (params) {},
}
