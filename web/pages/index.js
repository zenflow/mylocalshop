import { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import gql from 'graphql-tag'
import { useCurrentUser } from '../lib/auth/current-user-context'
import { useRealtimeSsrQuery } from '../lib/useRealtimeSsrQuery'
import { LogInButton } from '../components/LogInButton'
import { BlockLoader } from '../components/loaders'
import { PageHeading } from '../components/PageHeading'

export default function IndexPage () {
  const currentUser = useCurrentUser()
  return (
    <>
      <PageHeading title="Home"/>
      <h2>{
        currentUser
          ? <>Welcome {currentUser.first_name}!</>
          : <>Please <LogInButton variant="contained"/> to continue</>
      }</h2>
      {currentUser && <UserList/>}
      <style jsx>{`
        h2 { text-align: center; }
      `}</style>
    </>
  )
}

const SHOW_ALL = 'SHOW_ALL'

const query = gql`
  query ($where: users_bool_exp){
    users (where: $where) {
      is_admin
      email
      full_name
      created_by_user { email }
      updated_by_user { email }
      sessions_aggregate { aggregate { max { last_hit } } }
    }
  }
`

function UserList () {
  const [adminFieldFilter, setAdminFieldFilter] = useState(SHOW_ALL)
  const { loading, error, data } = useRealtimeSsrQuery({
    query,
    variables: {
      where: adminFieldFilter === SHOW_ALL ? {} : { is_admin: { _eq: adminFieldFilter } },
    },
  })
  if (error) {
    throw error // TODO
  }
  if (loading && !data) {
    return <BlockLoader/>
  }
  return (
    <>
      <span>
        <strong>Filter: </strong>
        <Select
          value={adminFieldFilter}
          onChange={event => setAdminFieldFilter(event.target.value)}
        >
          <MenuItem value={SHOW_ALL}><em>Show All</em></MenuItem>
          <MenuItem value={true}>Only Admin</MenuItem>
          <MenuItem value={false}>Only Non-Admin</MenuItem>
        </Select>
      </span>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>email</th>
            <th>name</th>
            <th>created by</th>
            <th>updated by</th>
            <th>last auth hit</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <tr key={user.email}>
              <td><strong>{user.is_admin && 'admin'}</strong></td>
              <td>{user.email}</td>
              <td>{user.full_name}</td>
              <td>{user.created_by_user?.email}</td>
              <td>{user.updated_by_user?.email}</td>
              <td>{new Date(user.sessions_aggregate.aggregate.max.last_hit).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        span { float: right; }
        table { width: 100%; }
        th { text-align: left; }
      `}</style>
    </>
  )
}
