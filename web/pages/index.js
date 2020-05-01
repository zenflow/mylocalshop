import { useState } from 'react'
import Link from 'next/link'
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
          : <>Please <Link href="/login"><a>Log in </a></Link> to continue</>
      }</h2>
      {session?.user.roleId === 'admin' && <UserList/>}
      <style jsx>{`
        h2 { text-align: center; }
      `}</style>
    </>
  )
}

export default IndexPage

function UserList () {
  const [roleFilter, setRoleFilter] = useState('')
  const { loading, error, data } = useLiveQuery({
    query: `
      ($where: users_bool_exp){
        users (where: $where) {
          email roleId firstName lastName
        }
      }
    `,
    variables: {
      where: roleFilter ? { roleId: { _eq: roleFilter } } : {},
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
      <span>Filter by Role: </span>
      <Select
        value={roleFilter}
        onChange={event => setRoleFilter(event.target.value)}
      >
        {
          ['', 'admin', 'user'].map(roleId => (
            <MenuItem key={roleId} value={roleId}>
              {roleId || <em>any</em>}
            </MenuItem>
          ))
        }
      </Select>
      <table>
        <tbody>
          {data.users.map(({ email, roleId, firstName, lastName }) => (
            <tr key={email}>
              <td>{email}</td>
              <td>{roleId}</td>
              <td>{firstName} {lastName}</td>
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
