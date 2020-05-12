import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import memoizeOne from 'memoize-one'
import { useSelector } from 'react-redux'
import { resourcesMeta } from '../../ra/resourcesMeta'
import { NotFoundErrorPage, AccessDeniedErrorPage, ErrorPage } from '../../components/errors'
import { FullPageLoader } from '../../components/loaders'
import { useAuth } from '../../lib/auth/auth-context'

const AdminPage = () => {
  const auth = useAuth()
  const router = useRouter()
  const { resource, view, id } = getRouteParams(router.query.args)
  if (!Object.keys(resourcesMeta).includes(resource)) {
    return <NotFoundErrorPage/>
  }
  const AdminResourceView = getAdminResourceView({ auth, resource, view, id })
  return <AdminResourceView/>
}

export default AdminPage

export const isJsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const getAdminResourceView = memoizeOne(({ auth, resource, view, id }) => {
  return dynamic(async () => {
    const isLoadingSelector = view === 'create'
      ? state => false
      : view === 'list'
        ? state => !state.admin.resources[resource].list.loadedOnce
        : state => !state.admin.resources[resource].data[id]
    const viewsFactory = (await import(`../../ra/resources/${resource}.js`)).default
    const views = viewsFactory(auth)
    const View = views[view]
    return function AdminResourceView () {
      const isLoading = useSelector(isLoadingSelector)
      if (!View) {
        return <NotFoundErrorPage/>
      }
      if (View === AccessDeniedErrorPage) {
        return <AccessDeniedErrorPage/>
      }
      return (
        <>
          {isLoading && <FullPageLoader/>}
          <div style={{ display: isLoading ? 'none' : 'block' }}>
            <View
              resource={resource}
              basePath={`/admin/${resource}`}
              hasList={!!views.list && views.list !== AccessDeniedErrorPage}
              hasEdit={!!views.edit && views.edit !== AccessDeniedErrorPage}
              hasCreate={!!views.create && views.create !== AccessDeniedErrorPage}
              hasShow={!!views.show && views.show !== AccessDeniedErrorPage}
              id={id}
            />
          </div>
        </>
      )
    }
  }, {
    ssr: false,
    loading ({ error }) {
      if (error) {
        Promise.reject(error)
        return <ErrorPage details={error.toString()}/>
      }
      return <FullPageLoader/>
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
