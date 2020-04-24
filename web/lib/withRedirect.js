import { useEffect } from 'react'
import Router from 'next/router'
import App from 'next/app'

export function withRedirect (AppComponent) {
  const WithRedirect = ({ redirectLocation, redirectMethod, ...pageProps }) => {
    useEffect(() => {
      if (redirectLocation) {
        // console.log(`redirecting from ${Router.asPath} to ${redirectLocation} using ${redirectMethod}`)
        Router[redirectMethod](redirectLocation)
      }
    })
    if (redirectLocation) {
      return <div/>
    }
    return <AppComponent {...pageProps} />
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName = AppComponent.displayName || AppComponent.name || 'Component'
    WithRedirect.displayName = `withRedirect(${displayName})`
  }

  WithRedirect.getInitialProps = async appContext => {
    const pageContext = appContext.ctx

    let redirectLocation = null
    let redirectMethod = null
    const redirect = (location, method = 'push') => {
      redirectLocation = Array.isArray(location)
        ? `${location[0]}?${new URLSearchParams(location[1])}`
        : location
      redirectMethod = method
    }

    appContext.redirect = redirect
    pageContext.redirect = redirect

    const appProps = AppComponent.getInitialProps
      ? await AppComponent.getInitialProps(appContext)
      : await App.getInitialProps(appContext)

    return {...appProps, redirectLocation, redirectMethod}
  }

  return WithRedirect
}
