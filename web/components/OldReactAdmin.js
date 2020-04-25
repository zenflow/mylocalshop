import { Layout, AppBar, Menu, Notification, AdminContext, AdminUI, Resource } from 'react-admin'
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

export const ReactAdmin = ({ dataProvider, authProvider }) => {
  return (
    <AdminContext {...{ dataProvider, authProvider }}>
      <AdminUI layout={MyLayout} theme={theme}>
        {Object.entries(getResources()).map(([name, { list, edit, create, show, icon }]) =>
          <Resource key={name} {...{ name, list, edit, create, show, icon }}/>,
        )}
      </AdminUI>
    </AdminContext>
  )
}
