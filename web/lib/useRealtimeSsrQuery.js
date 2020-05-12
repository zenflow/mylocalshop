import { useApolloClient, useQuery, useSubscription } from '@apollo/react-hooks'

export function useRealtimeSsrQuery ({ query, variables = {}, skip = false }) {
  if (!process.browser) {
    const { loading, error, data } = useQuery(query, { variables, skip })
    return { loading, error, data }
  }
  const subscription = getSubscriptionForQuery(query)
  let { loading, error, data } = useSubscription(subscription, { variables, skip })
  const client = useApolloClient()
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

const querySubscriptionMap = new Map()

function getSubscriptionForQuery (query) {
  if (querySubscriptionMap.has(query)) {
    return querySubscriptionMap.get(query)
  }
  if (query?.kind !== 'Document') {
    throw new Error('useRealtimeSsrQuery: Query must be parsed (hint: use graphql-tag)')
  }
  if (query.definitions.length !== 1) {
    throw new Error('useRealtimeSsrQuery: Query must have one and only one definition')
  }
  if (query.definitions[0].operation !== 'query') {
    throw new Error('useRealtimeSsrQuery: Query must define a *query* operation (not mutation or subscription)')
  }
  const body = query.loc.source.body.trim().replace(/^query /, 'subscription ')
  const subscription = {
    ...query,
    definitions: query.definitions.map(definition => ({
      ...definition,
      operation: 'subscription',
    })),
    loc: {
      ...query.loc,
      source: {
        ...query.loc.source,
        body,
      },
      end: body.length,
    },
  }
  querySubscriptionMap.set(query, subscription)
  return subscription
}
