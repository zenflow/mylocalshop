import { graphql } from '@gqless/react'
import { useGqless } from '../lib/gqless'
import { useSession} from '../lib/auth/react'
import Suspense from '../lib/SsrCompatibleSuspense'


const UsersView = graphql(() => {
  const {query} = useGqless()
  const session = useSession()
  if (!session) {
    // TODO: redirect to login
    return <h1>Access Denied</h1>
  }
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>email</th>
          <th>created at</th>
          <th>updated at</th>
          <th>picture</th>
        </tr>
        </thead>
        <tbody>
        {query.users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.created_at}</td>
            <td>{user.updated_at}</td>
            <td><img src={user.picture}/></td>
          </tr>
        ))}
        </tbody>
      </table>
      <style jsx>{`
        table { width: 100%; }
        img { height: 100px; }
      `}</style>
    </div>
  )
})

export default () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UsersView/>
      </Suspense>
    </div>
  )
}
