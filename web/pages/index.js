import CircularProgress from '@material-ui/core/CircularProgress'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useSession } from '../lib/auth/react'

const IndexPage = () => {
  const session = useSession()
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h2>
          {session && <>Welcome, user #{session.userId}!</>}
          {!session && <>Please <Link href="/login"><a>Log in </a></Link> to continue</>}
        </h2>
      </div>
      <CurrentUserView query="id email"/>
      <CurrentUserView query="id email firstName lastName"/>
    </>
  )
}

export default IndexPage

function CurrentUserView ({ query }) {
  const session = useSession()
  const { loading, error, data } = useQuery(gql`
      query ($id: uuid!) {
        users_by_pk(id: $id) {
          ${query}
        }
      }
  `, {
    variables: { id: session?.userId },
    skip: !session,
  })
  const user = data?.users_by_pk
  if (error) {
    // TODO: Error view (use 'react-admin's?)
    throw error
  }
  if (loading && !data) {
    return <CircularProgress/>
  }
  return (
    user
      ? (
        <pre style={{textAlign: 'left'}}>
          {JSON.stringify(user, null, 2)}
        </pre>
      )
      : <h2>No user</h2>
  )
}
