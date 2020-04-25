import { useEffect } from 'react'
import Router from 'next/router'
import App from 'next/app'

export function withRedirect (Component) {
  const WithRedirect = ({ redirectLocation, redirectMethod, ...props }) => {
    useEffect(() => {
      if (redirectLocation) {
        // console.log(`redirecting from ${Router.asPath} to ${redirectLocation} using ${redirectMethod}`)
        Router[redirectMethod](redirectLocation)
      }
    })
    if (redirectLocation) {
      return <div/>
    }
    return <Component {...props} />
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName = Component.displayName || Component.name || 'Component'
    WithRedirect.displayName = `withRedirect(${displayName})`
  }

  WithRedirect.getInitialProps = async ctx => {
    const appContext = ctx.ctx ? ctx : null
    const pageContext = ctx.ctx ? ctx.ctx : ctx

    let redirectLocation = null
    let redirectMethod = null
    const redirect = (location, method = 'push') => {
      redirectLocation = Array.isArray(location)
        ? `${location[0]}?${new URLSearchParams(location[1])}`
        : location
      redirectMethod = method
    }

    pageContext.redirect = redirect
    if (appContext) {
      appContext.redirect = redirect
    }

    const getInitialProps = Component.getInitialProps ||
      (appContext && App.getInitialProps) ||
      (ctx => ({}))

    const props = await getInitialProps(ctx)

    return { ...props, redirectLocation, redirectMethod }
  }

  return WithRedirect
}
