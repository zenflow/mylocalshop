import Router from 'next/router'
import {
  AuthContext, convertLegacyDataProvider, createAdminStore,
  DataProviderContext, Resource, TranslationProvider,
} from 'react-admin'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import defaultMessages from 'ra-language-english'
import hasuraDataProvider from '@zen_flow/ra-data-hasura'
import memoizeOne from 'memoize-one'
import { useSessionCookie } from './auth/session-cookie'
import { matchRoute } from '../matchRoute'
import { resourceNames } from '../resources/_meta'

export function ReactAdminContext ({ children }) {
  if (!process.browser) {
    return <>{children}</>
  }
  const sessionCookie = useSessionCookie()
  const sessionId = sessionCookie?.id
  return (
    <Provider store={getMyAdminStore(sessionId)}>
      <DataProviderContext.Provider value={getDataProvider(sessionId)}>
        <AuthContext.Provider value={authProvider}>
          <TranslationProvider i18nProvider={i18nProvider}>
            <ConnectedRouter history={getHistory()}>
              {resourceNames.map(name =>
                <Resource key={name} name={name} intent="registration"/>,
              )}
              {children}
            </ConnectedRouter>
          </TranslationProvider>
        </AuthContext.Provider>
      </DataProviderContext.Provider>
    </Provider>
  )
}

const getDataProvider = memoizeOne(sessionId => {
  return convertLegacyDataProvider(
    hasuraDataProvider(
      process.env.HASURA_ENGINE_ENDPOINT,
      { 'Content-Type': 'application/json', ...(sessionId ? { Authorization: sessionId } : {}) },
    ),
  )
})

const getMyAdminStore = memoizeOne(sessionId => {
  const adminStore = createAdminStore({
    dataProvider: getDataProvider(sessionId),
    authProvider,
    history: getHistory(),
  })
  console.log(`created react-admin client for session ${sessionId}`)
  return adminStore
})

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

const getHistory = memoizeOne(() => {
  const listeners = new Set()
  const history = {
    length: 1,
    action: 'POP',
    location: urlToLocation(Router.asPath),
    createHref ({ pathname, search }) {
      return [pathname, search].filter(Boolean).join('')
    },
    async push (to) {
      const { pathname, search } = typeof to === 'string'
        ? urlToLocation(to)
        : {
          pathname: to.pathname || history.location.pathname,
          search: to.search || '',
        }
      const query = Object.fromEntries(new URLSearchParams(search))
      const route = matchRoute(pathname)
      await Router.push(route, { pathname, query })
    },
    listen (listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
  Router.events.on('beforeHistoryChange', url => {
    history.location = urlToLocation(url)
    history.action = 'PUSH'
    history.length++
    // Actually this history change might be a POP or a REPLACE, but the above seems to work...
    listeners.forEach(listener => {
      listener(history.location, history.action)
    })
  })
  return history
})

function urlToLocation (url) {
  const urlParts = url.split('?')
  return {
    pathname: urlParts[0],
    search: urlParts[1] ? `?${urlParts[1]}` : '',
  }
}
