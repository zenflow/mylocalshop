/* This is for testing react-admin + our resources *with the default UI*
To use it
  - Remove use of <AppFrame> in pages/_app.js
  - Uncomment code in lib/react-admin/history.js to return a hash router instead
 */

import NoSsr from '@material-ui/core/NoSsr'
import { AdminUI, Resource } from 'react-admin'
import memoizeOne from 'memoize-one'
import fromEntries from 'fromentries'
import { isJsonEqual } from '../admin/[...args]'
import { useAuth } from '../../lib/auth/auth-context'
import { resourcesMeta } from '../../ra/resourcesMeta'

const resourceViewFactories = fromEntries(
  Object.keys(resourcesMeta)
    .map(name => [name, require(`../../ra/resources/${name}`).default]),
)

const getResourceViews = memoizeOne(
  auth => fromEntries(
    Object.entries(resourceViewFactories)
      .map(([name, factory]) => [name, factory(auth)]),
  ),
  isJsonEqual,
)

export default function DefaultAdminPage () {
  const auth = useAuth()
  const resourceViews = getResourceViews(auth)
  return (
    <NoSsr>
      <AdminUI>{
        Object.entries(resourceViews)
          .map(([name, views]) => (
            <Resource key={name} name={name} {...views}/>
          ))
      }</AdminUI>
    </NoSsr>
  )
}
