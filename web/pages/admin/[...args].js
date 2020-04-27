import Router from 'next/router'
import NoSsr from '@material-ui/core/NoSsr'
import { getResources } from '../../resources'
import { useSession } from '../../lib/auth/react'
import { RedirectToLogin } from '../../components/Redirect'

const AdminView = () => {
  const { args } = Router.query
  const resources = getResources()

  const resourceName = args[0]
  const resource = resources[resourceName]

  let View
  let id
  if (resource) {
    if (args.length === 1) {
      View = resource.list
    } else if (args.length === 2 && args[1] === 'create') {
      View = resource.create
    } else {
      id = args[1]
      if (args.length === 2) {
        View = resource.edit
      } else if (args.length === 3 && args[1] === 'show') {
        View = resource.show
      }
    }
  }

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
