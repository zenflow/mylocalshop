import { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { useSession } from '../hooks/session'
import { useLiveQuery } from '../hooks/graphql'

const IndexPage = () => {
  const session = useSession()
  return (
    <>
      <h2>{
        session
          ? <>Welcome {session.user.firstName}!</>
          : <>Please <a href="/api/auth/google">Log in </a> to continue</>
      }</h2>
      {session?.user.isAdmin && <UserList/>}
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
  const { loading, error, data } = useLiveQuery({
    query: `
      ($where: users_bool_exp){
        users (where: $where) {
          email firstName lastName isAdmin
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
      <h3>Users</h3>
      <span>Filter: </span>
      <Select
        value={adminFieldFilter}
        onChange={event => setadminFieldFilter(event.target.value)}
      >
        <MenuItem value={SHOW_ALL}><em>Show All</em></MenuItem>
        <MenuItem value={true}>Only Admin</MenuItem>
        <MenuItem value={false}>Only Non-Admin</MenuItem>
      </Select>
      <table>
        <tbody>
          {data.users.map(({ email, firstName, lastName, isAdmin }) => (
            <tr key={email}>
              <td>{email}</td>
              <td>{firstName} {lastName}</td>
              <td>{isAdmin && 'admin'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table { width: 100%; }
      `}</style>
    </>
  )
}
