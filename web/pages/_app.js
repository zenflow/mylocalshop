import { useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NoSsr from '@material-ui/core/NoSsr'
import { Notification } from 'react-admin'
import { AppFrame } from '../components/AppFrame'
import { withSession } from '../lib/auth/react'
import theme from '../theme'
import { NextReactAdminContext } from '../components/NextReactAdminContext'

function MyApp ({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <NextReactAdminContext>
      <Head>
        <title>mylocalshop</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppFrame>
          <Component {...pageProps} />
          <NoSsr><Notification/></NoSsr>
        </AppFrame>
      </ThemeProvider>
    </NextReactAdminContext>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default withSession(MyApp)
