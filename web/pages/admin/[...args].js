import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import memoizeOne from 'memoize-one'
import { useCurrentUser } from '../../lib/auth/useCurrentUser'
import { resourcesMeta } from '../../resources/_meta'
import { NotFoundErrorPage, AccessDeniedErrorPage, ErrorPage } from '../../components/errors'

/* Select only what's necessary, since changes in the result (due to changes in
session) will cause the resource components to recompute (via `getResources`) */
const getAuthorizationParams = currentUser => ({
  isLoggedIn: !!currentUser,
  userId: currentUser?.id,
  isUserAdmin: currentUser?.isAdmin,
})

const AdminPage = () => {
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  const { resource, view, id } = getRouteParams(router.query.args)
  if (!Object.keys(resourcesMeta).includes(resource)) {
    return <NotFoundErrorPage/>
  }
  const authorizationParams = getAuthorizationParams(currentUser)
  const AdminResourceView = getAdminResourceView({ resource, authorizationParams, view })
  return <AdminResourceView id={id}/>
}

export default AdminPage

const isJsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const getAdminResourceView = memoizeOne(({ resource, authorizationParams, view }) => {
  return dynamic(async () => {
    const viewsFactory = (await import(`../../resources/${resource}.js`)).default
    const views = viewsFactory(authorizationParams)
    const View = views[view]
    return function AdminResourceView ({ id }) {
      if (!View) {
        return <NotFoundErrorPage/>
      }
      if (View === AccessDeniedErrorPage) {
        return <AccessDeniedErrorPage/>
      }
      return (
        <View
          resource={resource}
          basePath={`/admin/${resource}`}
          hasList={!!views.list && views.list !== AccessDeniedErrorPage}
          hasEdit={!!views.edit && views.edit !== AccessDeniedErrorPage}
          hasCreate={!!views.create && views.create !== AccessDeniedErrorPage}
          hasShow={!!views.show && views.show !== AccessDeniedErrorPage}
          id={id}
        />
      )
    }
  }, {
    ssr: false,
    loading ({ error, pastDelay }) {
      if (error) {
        Promise.reject(error)
        return <ErrorPage details={error.toString()}/>
      }
      return pastDelay ? <h1>Loading...</h1> : <></>
    },
  })
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
