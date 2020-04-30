// TODO: useLiveQuery currently fetches data through both "query" and "subscription"

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect } from 'react'

export function useLiveQuery ({ query, variables = {}, skip = false }) {
  query = query.trim().replace(/^[a-zA-Z_]*\s*/, '')
  const { loading, error, data, subscribeToMore, } = useQuery(
    gql`query ${query.trim()}`,
    { variables, skip, fetchPolicy: 'cache-first' },
  )
  useEffect(() => {
    let destroy
    if (!skip) {
      destroy = subscribeToMore({
        document: gql`subscription ${query.trim()}`,
        variables,
        updateQuery: (prev, {subscriptionData: {data}}) => data,
      })
    }
    return () => destroy?.()
  }, [query, JSON.stringify(variables), !!skip])
  return {loading, error, data}
}
