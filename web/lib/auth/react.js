import React from 'react'
import { getSessionCookie } from './session-cookie'
import App from 'next/app'

export const useSession = () => React.useContext(SessionContext)
export const SessionContext = React.createContext()

export function withSession (Component) {
  const WithSession = ({ session, ...appProps }) => {
    return (
      <SessionContext.Provider value={session}>
        <Component {...appProps} />
      </SessionContext.Provider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName = Component.displayName || Component.name || 'Component'
    WithSession.displayName = `withSession(${displayName})`
  }

  WithSession.getInitialProps = async ctx => {
    const appContext = ctx.ctx ? ctx : null
    const pageContext = ctx.ctx ? ctx.ctx : ctx

    const session = getSessionCookie(pageContext.req)

    pageContext.session = session
    if (appContext) {
      appContext.session = session
    }

    const getInitialProps = Component.getInitialProps ||
      (appContext && App.getInitialProps) ||
      (ctx => ({}))

    const props = await getInitialProps(ctx)

    return { ...props, session }
  }

  return WithSession
}
