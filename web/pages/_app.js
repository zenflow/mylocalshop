import { useEffect } from 'react'
// import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NoSsr from '@material-ui/core/NoSsr'
import { Notification } from 'react-admin'
import { AppFrame } from '../components/AppFrame/AppFrame'
import { withSession } from '../hooks/session'
import theme from '../theme'
import { ReactAdminContext } from '../react-admin'
import { withApollo } from '../apollo'

function MyApp ({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ReactAdminContext>
      <ThemeProvider theme={theme}>
        <Head>
          <title>mylocalshop</title>
        </Head>
        <CssBaseline />
        <AppFrame>
          <Component {...pageProps} />
          <NoSsr><Notification/></NoSsr>
        </AppFrame>
      </ThemeProvider>
    </ReactAdminContext>
  )
}

/* MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
} */

export default withApollo(withSession(MyApp))
