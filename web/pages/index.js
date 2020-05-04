import { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { useCurrentUser } from '../lib/auth/useCurrentUser'
import { useRealtimeSsrQuery } from '../lib/useRealtimeSsrQuery'
import { LogInButton } from '../components/LogInButton'

const IndexPage = () => {
  const { currentUser } = useCurrentUser()
  return (
    <>
      <h2>{
        currentUser
          ? <>Welcome {currentUser.firstName}!</>
          : <>Please <LogInButton variant="contained"/> to continue</>
      }</h2>
      {currentUser && <UserList/>}
      <style jsx>{`
        h2 { text-align: center; }
      `}</style>
    </>
  )
}

export default IndexPage

const SHOW_ALL = 'SHOW_ALL'

function UserList () {
  const [adminFieldFilter, setadminFieldFilter] = useState(SHOW_ALL)
  const { loading, error, data } = useRealtimeSsrQuery({
    query: `
      ($where: users_bool_exp){
        users (where: $where) {
          isAdmin
          email
          firstName lastName
          createdByUser { email }
          updatedByUser { email }
        }
      }
    `,
    variables: {
      where: adminFieldFilter === SHOW_ALL ? {} : { isAdmin: { _eq: adminFieldFilter } },
    },
  })
  if (error) {
    throw error // TODO
  }
  if (loading && !data) {
    return <CircularProgress/>
  }
  return (
    <>
      <span>
        <strong>Filter: </strong>
        <Select
          value={adminFieldFilter}
          onChange={event => setadminFieldFilter(event.target.value)}
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
          </tr>
        </thead>
        <tbody>
          {data.users.map(({ email, firstName, lastName, isAdmin, createdByUser, updatedByUser }) => (
            <tr key={email}>
              <td><strong>{isAdmin && 'admin'}</strong></td>
              <td>{email}</td>
              <td>{firstName} {lastName}</td>
              <td>{createdByUser?.email}</td>
              <td>{updatedByUser?.email}</td>
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
