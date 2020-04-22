import React from 'react'
import { getSessionCookie } from './session-cookie'
import App from 'next/app'

export const useSession = () => React.useContext(SessionContext)
export const SessionContext = React.createContext()

export function withSession (AppComponent) {
  const WithSession = ({ session, ...appProps }) => {
    return (
      <SessionContext.Provider value={session}>
        <AppComponent {...appProps} />
      </SessionContext.Provider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName = AppComponent.displayName || AppComponent.name || 'Component'
    WithSession.displayName = `withSession(${displayName})`
  }

  WithSession.getInitialProps = async appContext => {
    const pageContext = appContext.ctx

    const session = getSessionCookie(pageContext.req)

    appContext.session = session
    pageContext.session = session

    const appProps = AppComponent.getInitialProps
      ? await AppComponent.getInitialProps(appContext)
      : await App.getInitialProps(appContext)

    return {...appProps, session}
  }

  return WithSession
}
