import React from 'react'
import { useSessionCookie } from './session-cookie'
import App from 'next/app'
import { useRealtimeSsrQuery } from '../useRealtimeSsrQuery'

export const useCurrentUser = () => React.useContext(CurrentUserContext)
export const CurrentUserContext = React.createContext()

export function withCurrentUser (AppComponent) {
  const WithCurrentUser = (appProps) => {
    const sessionCookie = useSessionCookie()
    const { loading, error, data } = useRealtimeSsrQuery({
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
      if (error.message === 'no subscriptions exist') {
        // This 'no subscriptions exist' error is ok; don't throw.
        // We get this when the item requested for subscription doesn't exist, which we are expecting.
      } else {
        throw error
      }
    }
    const value = {
      currentUserLoading: loading,
      currentUser: data?.sessions_by_pk?.user, // eslint-disable-line camelcase
    }
    return (
      <CurrentUserContext.Provider value={value}>
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
