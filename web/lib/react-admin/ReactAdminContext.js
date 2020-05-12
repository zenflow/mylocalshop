import { AuthContext, DataProviderContext, Resource, TranslationProvider } from 'react-admin'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import defaultMessages from 'ra-language-english'
import { resourcesMeta } from '../../ra/resourcesMeta'
import { getAdminClient } from './admin-client'
import { getHistory } from './history'
import { useAuth } from '../auth/auth-context'

const i18nProvider = polyglotI18nProvider(locale => {
  // if (locale !== 'en') { return messages[locale] }
  return defaultMessages
})

export function ReactAdminContext ({ children }) {
  if (!process.browser) {
    return <>{children}</>
  }
  const auth = useAuth()
  const { adminStore, dataProvider, authProvider } = getAdminClient(auth)
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
