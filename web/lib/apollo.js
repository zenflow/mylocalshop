import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import createApolloClient from '../apolloClient'

let globalApolloClient = null

const getApolloClient = (initialState, req) => {
  if (!process.browser) {
    return createApolloClient(initialState, req)
  }
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState)
  }
  return globalApolloClient
}

export const withApollo = AppComponent => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || getApolloClient(apolloState)
    return (
      <ApolloProvider client={client}>
        <AppComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName = AppComponent.displayName || AppComponent.name || 'Component'
    WithApollo.displayName = `withApollo(${displayName})`
  }

  WithApollo.getInitialProps = async appContext => {
    const pageContext = appContext.ctx

    const apolloClient = getApolloClient({}, pageContext.req)
    appContext.apolloClient = appContext
    pageContext.apolloClient = appContext

    const pageProps = AppComponent.getInitialProps
      ? await AppComponent.getInitialProps(appContext)
      : await App.getInitialProps(appContext)

    if (appContext.res?.finished) {
      return pageProps
    }

    let apolloState
    if (!process.browser) {
      const { AppTree } = appContext
      try {
        const { getDataFromTree } = await import('@apollo/react-ssr')
        const props = { ...pageProps, apolloClient }
        await getDataFromTree(<AppTree {...props} />)
      } catch (error) {
        console.error('Error while running `getDataFromTree`', error)
      }
      Head.rewind()
      apolloClient.toJSON = () => null
      apolloState = apolloClient.cache.extract()
    }

    return {
      ...pageProps,
      apolloClient,
      apolloState,
    }
  }

  return WithApollo
}
