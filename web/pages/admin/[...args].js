import NoSsr from '@material-ui/core/NoSsr'
import { useRouter } from 'next/router'
import memoizeOne from 'memoize-one'
import { getResources } from '../../resources'
import { useSession } from '../../hooks/session'
import { RedirectToLogin } from '../../components/redirects'

/* Select only what's necessary, since changes in the result (due to changes in
session) will cause the resource components to recompute (via `getResources`) */
const getAuthorizationParams = session => ({
  isLoggedIn: !!session,
  userId: session?.user.id,
  isUserAdmin: session?.user.roleId === 'admin',
})

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

const isJsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const memoizedGetResources = memoizeOne(getResources, isJsonEqual)

const AdminView = () => {
  const session = useSession()
  const authorizationParams = getAuthorizationParams(session)
  console.log('authorizationParams', authorizationParams)
  const resources = memoizedGetResources(authorizationParams)

  const { query: { args } } = useRouter()
  const resourceName = args[0]

  const resource = resources[resourceName]

  const { action, id } = getRouteParams(args)
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
  return { action, id }
}
