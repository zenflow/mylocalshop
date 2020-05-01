import polyglotI18nProvider from 'ra-i18n-polyglot'
import defaultMessages from 'ra-language-english'
import hasuraDataProvider from '@zen_flow/ra-data-hasura'
import { createNextReactAdminContext } from './lib/react-admin'
import { getSessionCookie } from './lib/session-cookie'
import { matchRoute } from './matchRoute'

// We maintain this so that we can have some info on resources **without**
//   importing the entire collection of resources including their UI components.
const resourceNames = [
  'sessions',
  'users',
]

const sessionCookie = process.browser && getSessionCookie()

const dataProvider = hasuraDataProvider(
  process.env.HASURA_ENGINE_ENDPOINT,
  { 'Content-Type': 'application/json', Authorization: sessionCookie?.id ?? undefined },
)

const authProvider = {
  async login (params) {},
  async logout (params) {},
  async checkAuth (params) {},
  async checkError (error) {}, // eslint-disable-line handle-callback-err
  async getPermissions (params) {},
}

const i18nProvider = polyglotI18nProvider(locale => {
  // if (locale !== 'en') { return messages[locale] }
  return defaultMessages
})

export const ReactAdminContext = createNextReactAdminContext({
  resourceNames,
  matchRoute,
  dataProvider,
  authProvider,
  i18nProvider,
})
