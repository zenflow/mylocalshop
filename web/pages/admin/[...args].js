import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import memoizeOne from 'memoize-one'
import { useSession } from '../../hooks/session'
import { RedirectToLogin } from '../../components/redirects'
import { resourceNames } from '../../react-admin'

/* Select only what's necessary, since changes in the result (due to changes in
session) will cause the resource components to recompute (via `getResources`) */
const getAuthorizationParams = session => ({
  isLoggedIn: !!session,
  userId: session?.user.id,
  isUserAdmin: session?.user.roleId === 'admin',
})

const AdminPage = () => {
  const session = useSession()
  const router = useRouter()
  if (!session) {
    return <RedirectToLogin/>
  }
  const { resource, view, id } = getRouteParams(router.query.args)
  const authorizationParams = getAuthorizationParams(session)
  const AdminResourceView = getAdminResourceView({ resource, authorizationParams, view })
  return <AdminResourceView id={id}/>
}

export default AdminPage

const isJsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const NotFoundError = () => <div>Not found</div>

const getAdminResourceView = memoizeOne(({ resource, authorizationParams, view }) => {
  if (!resourceNames.includes(resource)) {
    return <NotFoundError/>
  }
  return dynamic(async () => {
    const viewsFactory = (await import(`../../resources/${resource}.js`)).default
    const views = viewsFactory(authorizationParams)
    const View = views[view]
    return function AdminResourceView ({ id }) {
      if (!View) {
        return <NotFoundError/>
      }
      return (
        <View
          resource={resource}
          basePath={`/admin/${resource}`}
          hasList={!!views.list}
          hasEdit={!!views.edit}
          hasCreate={!!views.create}
          hasShow={!!views.show}
          id={id}
        />
      )
    }
  }, { ssr: false })
}, isJsonEqual)

function getRouteParams (args) {
  const resource = args[0]
  let view
  let id
  if (args.length === 1) {
    view = 'list'
  } else if (args.length === 2 && args[1] === 'create') {
    view = 'create'
  } else {
    id = args[1]
    if (args.length === 2) {
      view = 'edit'
    } else if (args.length === 3 && args[1] === 'show') {
      view = 'show'
    }
  }
  return { resource, view, id }
}
