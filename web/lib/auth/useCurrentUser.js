import React from 'react'
import { useSessionCookie } from './session-cookie'
import App from 'next/app'
import { useLiveQuery } from '../useLiveQuery'

export const useCurrentUser = () => React.useContext(CurrentUserContext)
export const CurrentUserContext = React.createContext()

export function withCurrentUser (AppComponent) {
  const WithCurrentUser = (appProps) => {
    const sessionCookie = useSessionCookie()
    const { error, data } = useLiveQuery({
      query: `
        ($id: uuid!) {
          sessions_by_pk(id: $id) {
            user {
              id email firstName lastName isAdmin
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
    const currentUser = data?.sessions_by_pk?.user // eslint-disable-line camelcase
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <AppComponent {...appProps} />
      </CurrentUserContext.Provider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName = AppComponent.displayName || AppComponent.name || 'Component'
    WithCurrentUser.displayName = `withCurrentUser(${displayName})`
  }

  WithCurrentUser.getInitialProps = AppComponent.getInitialProps || App.getInitialProps

  return WithCurrentUser
}
