import Router from 'next/router'
import {
  createAdminStore, AuthContext, convertLegacyDataProvider,
  DataProviderContext, TranslationProvider, Resource,
} from 'react-admin'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import defaultMessages from 'ra-language-english'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import hasuraDataProvider from 'ra-data-hasura'
import mem from 'mem'
import { getSessionCookie } from '../lib/auth/session-cookie'
import { resourceNames } from '../resources/_meta'

// Important: This component should not rerender, or there will be problems with resource registration
export function NextReactAdminContext ({ children }) {
  if (!process.browser) {
    return <>{children}</>
  }
  return (
    <Provider store={getAdminStore()}>
      <AuthContext.Provider value={authProvider}>
        <DataProviderContext.Provider value={getDataProvider()}>
          <TranslationProvider i18nProvider={i18nProvider}>
            <ConnectedRouter history={getHistory()}>
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

const getAdminStore = mem(() => {
  return createAdminStore({
    authProvider,
    dataProvider: getDataProvider(),
    history: getHistory(),
  })
})

const authProvider = {
  // Hack to have our notification text nice & human-friendly instead of JSON
  async checkError (error) {
    const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`
    let errorJson
    try {
      errorJson = JSON.parse(error.message)
    } catch (error) {}
    if (errorJson && errorJson.code && errorJson.error) {
      error.message = `${errorJson.code.split('-').map(capitalize).join(' ')}: ${capitalize(errorJson.error)}`
    }
  },
}

const getDataProvider = mem(() => {
  const session = getSessionCookie()
  let dataProvider = hasuraDataProvider(
    process.env.HASURA_ENGINE_ENDPOINT,
    { 'Content-Type': 'application/json', Authorization: session ? session.id : undefined },
    // TODO: compute Authorization header for every request
  )
  if (typeof dataProvider === 'function') {
    dataProvider = convertLegacyDataProvider(dataProvider)
  } else {
    console.warn(`Expected \`typeof dataProvider\` to be function, instead got ${typeof dataProvider}`)
    console.warn('Time to remove this if/then statement?')
  }
  return dataProvider
})

const i18nProvider = polyglotI18nProvider(locale => {
  // TODO: if (locale !== 'en') { return messages[locale] }
  return defaultMessages
})

const getHistory = mem(() => {
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
      let route = '/admin/[...args]'
      if (!pathname.startsWith('/admin/')) {
        console.warn(`'history' being routed outside /admin/ ... to (${pathname}${search})`)
        console.warn()
        console.warn(new Error().stack)
        route = pathname
      }
      await Router.push(
        { pathname: route, query },
        { pathname, query },
      )
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
