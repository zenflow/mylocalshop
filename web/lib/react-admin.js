import Router from 'next/router'
import {
  AuthContext, DataProviderContext, Resource, TranslationProvider,
  convertLegacyDataProvider, createAdminStore, defaultI18nProvider,
} from 'react-admin'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

export function createNextReactAdminContext ({
  resourceNames,
  matchRoute,
  dataProvider,
  authProvider = null,
  i18nProvider = defaultI18nProvider,
}) {
  dataProvider = typeof dataProvider === 'function'
    ? convertLegacyDataProvider(dataProvider)
    : dataProvider
  let history
  let adminStore
  // Important: This component should not rerender, or there will be problems with resource registration
  return function NextReactAdminContext ({ children }) {
    if (!process.browser) {
      return <>{children}</>
    }
    history = history || createHistory({ matchRoute })
    adminStore = adminStore || createAdminStore({ dataProvider, authProvider, history })
    return (
      <Provider store={adminStore}>
        <AuthContext.Provider value={authProvider}>
          <DataProviderContext.Provider value={dataProvider}>
            <TranslationProvider i18nProvider={i18nProvider}>
              <ConnectedRouter history={history}>
                {resourceNames.map(name =>
                  <Resource key={name} name={name} intent="registration"/>,
                )}
                {children}
              </ConnectedRouter>
            </TranslationProvider>
          </DataProviderContext.Provider>
        </AuthContext.Provider>
      </Provider>
    )
  }
}

const createHistory = ({ matchRoute }) => {
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
}

function urlToLocation (url) {
  const urlParts = url.split('?')
  return {
    pathname: urlParts[0],
    search: urlParts[1] ? `?${urlParts[1]}` : '',
  }
}
