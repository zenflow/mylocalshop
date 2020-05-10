import React from 'react'
import App from 'next/app'
import gql from 'graphql-tag'
import { useRealtimeSsrQuery } from '../useRealtimeSsrQuery'
import { useAuth } from './auth-context'

export const useCurrentUser = () => React.useContext(CurrentUserContext)
export const CurrentUserContext = React.createContext()

const QUERY = `
  query ($id: uuid!) {
    sessions_by_pk(id: $id) {
      user {
        id role first_name
      }
    }
  }
`
export function withCurrentUser (AppComponent) {
  const WithCurrentUser = (appProps) => {
    const { isLoggedIn, sessionId } = useAuth()
    const { error, data } = useRealtimeSsrQuery({
      query: QUERY,
      variables: { id: sessionId },
      skip: !isLoggedIn,
    })
    if (error) {
      maybeThrowError(error)
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

  WithCurrentUser.getInitialProps = async ctx => {
    if (ctx.auth.isLoggedIn) {
      let data
      try {
        data = (await ctx.apolloClient.query({
          query: gql`${QUERY}`,
          variables: { id: ctx.auth.sessionId },
          fetchPolicy: 'cache-first',
        })).data
      } catch (error) {
        maybeThrowError(error)
      }
      const currentUser = data?.sessions_by_pk?.user // eslint-disable-line camelcase
      ctx.ctx.currentUser = ctx.currentUser = currentUser
    }
    return (AppComponent.getInitialProps || App.getInitialProps)(ctx)
  }

  return WithCurrentUser
}

function maybeThrowError (error) {
  if (error.message?.includes('Authentication hook unauthorized this request')) {
    console.log(error)
  } else {
    throw error
  }
}
