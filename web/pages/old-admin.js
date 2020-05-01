import dynamic from 'next/dynamic'
import hasuraDataProvider from '@zen_flow/ra-data-hasura'
import { Layout, AppBar, Menu, Notification, AdminContext, AdminUI, Resource } from 'react-admin'
import { createHashHistory } from 'history'
import { useSession } from '../hooks/session'
import { RedirectToLogin } from '../components/redirects'
import { getSessionCookie } from '../lib/session-cookie'
import theme from '../theme'
import { getResources } from '../resources'

const MyLayout = (props) => {
  return (
    <Layout
      {...props}
      appBar={(props) => {
        // console.log('appBar props', props)
        return <AppBar {...props}/>
      }}
      menu={(props) => {
        // console.log('menu props', props)
        return <Menu {...props}/>
      }}
      notification={Notification}
    />
  )
}

const ReactAdmin = ({ dataProvider }) => {
  return (
    <AdminContext {...{
      dataProvider,
      authProvider: async () => {},
      history: createHashHistory(),
    }}>
      <AdminUI layout={MyLayout} theme={theme}>
        {Object.entries(getResources()).map(([name, { list, edit, create, show, icon }]) =>
          <Resource key={name} {...{ name, list, edit, create, show, icon }}/>,
        )}
      </AdminUI>
    </AdminContext>
  )
}

const browserOnly = (factoryFn) => dynamic(async () => factoryFn, { ssr: false })

const AdminView = browserOnly(() => {
  const session = getSessionCookie()
  const dataProvider = hasuraDataProvider(
    process.env.HASURA_ENGINE_ENDPOINT,
    { 'Content-Type': 'application/json', Authorization: session ? session.id : undefined },
    // TODO: compute Authorization header for every request
  )
  return (<ReactAdmin dataProvider={dataProvider}/>)
})

const AdminPage = () => {
  const session = useSession()
  if (!session) {
    return <RedirectToLogin/>
  }
  return <AdminView/>
}

export default AdminPage
