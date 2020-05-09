import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { getApolloClient } from './apollo-client'
import { useAuth } from '../auth/auth-context'

export function withApollo (AppComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...props }) => {
    const auth = useAuth()
    const client = apolloClient || getApolloClient(apolloState, auth)
    return (
      <ApolloProvider client={client}>
        <AppComponent {...props} />
      </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName = AppComponent.displayName || AppComponent.name || 'Component'
    WithApollo.displayName = `withApollo(${displayName})`
  }

  WithApollo.getInitialProps = async ctx => {
    const apolloClient = getApolloClient({}, ctx.auth)
    ctx.ctx.apolloClient = ctx.apolloClient = apolloClient

    const getInitialProps = AppComponent.getInitialProps || App.getInitialProps
    const pageProps = await getInitialProps(ctx)

    if (ctx.res?.finished) {
      return pageProps
    }

    let apolloState
    if (!process.browser) {
      const { AppTree } = ctx
      try {
        const { getDataFromTree } = await import('@apollo/react-ssr')
        const props = { ...pageProps, apolloClient, auth: ctx.auth }
        await getDataFromTree(<AppTree {...props} />)
      } catch (error) {
        console.error('Error while running `getDataFromTree`', error)
      }
      Head.rewind()
      apolloClient.toJSON = () => null
      apolloState = apolloClient.cache.extract()
    }

    return { ...pageProps, apolloClient, apolloState }
  }

  return WithApollo
}
