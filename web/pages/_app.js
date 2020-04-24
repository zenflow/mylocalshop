import 'semantic-ui-css/semantic.min.css'

// import App from 'next/app'
import { AppFrame } from '../components/AppFrame'
import { withGqless } from '../lib/gqless'
import { withSession } from '../lib/auth/react'
import { withRedirect } from '../lib/withRedirect'
import Suspense from '../components/SsrCompatibleSuspense'
import { Loader } from 'semantic-ui-react'

function MyApp ({ Component, pageProps }) {
  return (
    <Suspense>
      <AppFrame>
        <Suspense fallback={<Loader active/>}>
          <Component {...pageProps} />
        </Suspense>
      </AppFrame>
    </Suspense>
  )
}

/*
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return {...appProps}
}
*/

export default withGqless(withSession(withRedirect(MyApp)))
