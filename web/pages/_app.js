import { useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NoSsr from '@material-ui/core/NoSsr'
import { Notification } from 'react-admin'
import { AppFrame } from '../components/AppFrame/AppFrame'
import { withCurrentUser } from '../lib/auth/current-user-context'
import theme from '../theme'
import { ReactAdminContext } from '../lib/react-admin/ReactAdminContext'
import { withApollo } from '../lib/apollo/withApollo'
import { withAuth } from '../lib/auth/auth-context'
import { AuthReloader } from '../lib/auth/AuthReloader'

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
      <AuthReloader/>
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

export default withAuth(withApollo(withCurrentUser(MyApp)))
