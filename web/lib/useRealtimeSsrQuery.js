import { useApolloClient, useQuery, useSubscription } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export function useRealtimeSsrQuery ({ query, variables = {}, skip = false }) {
  // trim query & remove possible "query " or "subscription " prefix
  query = query.trim().replace(/^[a-zA-Z_]*\s*/, '')

  const subscription = gql`subscription ${query}`
  query = gql`query ${query}`

  if (!process.browser) {
    const { loading, error, data } = useQuery(query, { variables, skip })
    return { loading, error, data }
  }

  const client = useApolloClient()
  let { loading, error, data } = useSubscription(subscription, { variables, skip })
  if (!skip) {
    if (data) {
      client.writeQuery({ query, variables, data })
    } else {
      try {
        data = client.readQuery({ query, variables })
      } catch (error) {}
    }
  }
  return { loading, error, data }
}
