import { useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NoSsr from '@material-ui/core/NoSsr'
import { Notification } from 'react-admin'
import { AppFrame } from '../components/AppFrame/AppFrame'
import { withCurrentUser } from '../lib/auth/useCurrentUser'
import theme from '../theme'
import { ReactAdminContext } from '../lib/react-admin/ReactAdminContext'
import { withApollo } from '../lib/apollo/withApollo'
import { withSessionCookie } from '../lib/auth/session-cookie'
import { ClientReloader } from '../lib/auth/ClientReloader'

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
      <ClientReloader/>
      <Head>
        <title>mylocalshop</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppFrame>
          <Component {...pageProps} />
          <NoSsr><Notification/></NoSsr>
        </AppFrame>
      </ThemeProvider>
    </ReactAdminContext>
  )
}

export default withApollo(withSessionCookie(withCurrentUser(MyApp)))
