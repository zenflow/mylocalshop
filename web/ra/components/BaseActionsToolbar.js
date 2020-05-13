import { useRouter } from 'next/router'
import { useReactAdminTitle } from '../../lib/react-admin/useReactAdminTitle'
import { PageHeading } from '../../components/PageHeading'

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`

export function BaseActionsToolbar ({ resource, children }) {
  const title = useReactAdminTitle()
  const router = useRouter()
  const currentPath = router.asPath.split('#')[0].split('?')[0]
  const resourceBasePath = `/admin/${resource}`
  const crumbs = (currentPath !== resourceBasePath) &&
    { title: capitalize(resource), path: resourceBasePath }
  return (
    <PageHeading title={title} crumbs={crumbs}>
      {children}
    </PageHeading>
  )
}
