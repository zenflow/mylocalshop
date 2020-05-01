import React from 'react'
import { getSessionCookie } from '../lib/session-cookie'
import App from 'next/app'
import { useLiveQuery } from './graphql'

export const useSession = () => React.useContext(SessionContext)
export const SessionContext = React.createContext()

export function withSession (AppComponent) {
  const WithSession = ({ sessionCookie, ...appProps }) => {
    const { error, data } = useLiveQuery({
      query: `
        ($id: uuid!) {
          sessions_by_pk(id: $id) {
            user {
              id roleId email firstName lastName
            }
          }
        }
      `,
      variables: { id: sessionCookie?.id },
      skip: !sessionCookie,
    })
    if (error) {
      throw error // TODO
    }
    const session = data?.sessions_by_pk // eslint-disable-line camelcase
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

    const sessionCookie = getSessionCookie(pageContext.req)

    const getInitialProps = AppComponent.getInitialProps || App.getInitialProps
    const props = await getInitialProps(appContext)

    return { ...props, sessionCookie }
  }

  return WithSession
}
