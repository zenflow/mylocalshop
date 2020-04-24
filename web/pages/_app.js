import 'semantic-ui-css/semantic.min.css'

// import App from 'next/app'
import { AppFrame } from '../components/AppFrame'
import { withGqless } from '../lib/gqless'
import { withSession } from '../lib/auth/react'
import { withRedirect } from '../lib/withRedirect'

function MyApp ({ Component, pageProps }) {
  return (
    <AppFrame>
      <Component {...pageProps} />
    </AppFrame>
  )
}

/*
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return {...appProps}
}
*/

export default withGqless(withSession(withRedirect(MyApp)))
