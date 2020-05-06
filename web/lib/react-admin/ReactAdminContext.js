import { AuthContext, DataProviderContext, Resource, TranslationProvider } from 'react-admin'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import defaultMessages from 'ra-language-english'
import { useSessionCookie } from '../auth/session-cookie'
import { resourcesMeta } from '../../resources/_meta'
import { getAdminClient } from './admin-client'
import { getHistory } from './history'

const i18nProvider = polyglotI18nProvider(locale => {
  // if (locale !== 'en') { return messages[locale] }
  return defaultMessages
})

export function ReactAdminContext ({ children }) {
  if (!process.browser) {
    return <>{children}</>
  }
  const sessionCookie = useSessionCookie()
  const { adminStore, dataProvider, authProvider } = getAdminClient(sessionCookie)
  return (
    <Provider store={adminStore}>
      <DataProviderContext.Provider value={dataProvider}>
        <AuthContext.Provider value={authProvider}>
          <TranslationProvider i18nProvider={i18nProvider}>
            <ConnectedRouter history={getHistory()}>
              {Object.keys(resourcesMeta).map(resourceName =>
                <Resource key={resourceName} name={resourceName} intent="registration"/>,
              )}
              {children}
            </ConnectedRouter>
          </TranslationProvider>
        </AuthContext.Provider>
      </DataProviderContext.Provider>
    </Provider>
  )
}
