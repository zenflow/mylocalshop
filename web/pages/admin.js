import dynamic from 'next/dynamic'
import hasuraDataProvider from 'ra-data-hasura'
import { useSession } from '../lib/auth/react'

const browserOnly = (factoryFn) => dynamic(factoryFn, { ssr: false })

const AdminView = browserOnly(async () => {
  const { ReactAdmin } = await import('../components/ReactAdmin')
  return () => {
    const session = useSession()
    const dataProvider = hasuraDataProvider(
      process.env.HASURA_ENGINE_ENDPOINT,
      { 'Content-Type': 'application/json', Authorization: session.id },
    )
    const authProvider = async () => {}
    return <ReactAdmin {...{ dataProvider, authProvider }}/>
  }
})

const AdminPage = () => <AdminView/>
AdminPage.getInitialProps = ({ session, redirect, asPath }) => {
  if (!session) {
    redirect(['/login', { redirect: asPath }], 'replace')
  }
  return {}
}

export default AdminPage
