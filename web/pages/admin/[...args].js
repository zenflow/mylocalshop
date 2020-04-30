import Router from 'next/router'
import NoSsr from '@material-ui/core/NoSsr'
import { getResources } from '../../resources'
import { useSession } from '../../lib/auth/react'
import { RedirectToLogin } from '../../components/Redirect'

function getRouteParams (args) {
  let action
  let id
  if (args.length === 1) {
    action = 'list'
  } else if (args.length === 2 && args[1] === 'create') {
    action = 'create'
  } else {
    id = args[1]
    if (args.length === 2) {
      action = 'edit'
    } else if (args.length === 3 && args[1] === 'show') {
      action = 'show'
    }
  }
  return {action, id}
}

const AdminView = () => {
  const { args } = Router.query
  const resources = getResources()

  const resourceName = args[0]
  const resource = resources[resourceName]

  const {action, id} = getRouteParams(args)
  const View = resource[action]

  if (!View) {
    return <h1>Not Found</h1>
  }

  return (
    <View
      resource={resourceName}
      basePath={`/admin/${resourceName}`}
      hasList={!!resource.list}
      hasEdit={!!resource.edit}
      hasCreate={!!resource.create}
      hasShow={!!resource.show}
      id={id}
    />
  )
}

const AdminPage = () => {
  const session = useSession()
  if (!session) {
    return <RedirectToLogin/>
  }
  return (
    <NoSsr>
      <AdminView/>
    </NoSsr>
  )
}

export default AdminPage
