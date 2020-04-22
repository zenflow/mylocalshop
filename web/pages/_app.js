// import App from 'next/app'
import { withGqless } from '../lib/gqless'
import { withSession } from '../lib/auth/react'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

/*
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return {...appProps}
}
*/

export default withGqless(withSession(MyApp))
