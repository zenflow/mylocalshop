import Link from 'next/link'
import { useSession } from '../lib/auth/react'

const IndexPage = () => {
  const session = useSession()
  return (
    <div>
      <p>{session
        ? <a href="/api/auth/logout">Log out</a>
        : <Link href="/login"><a>Log in</a></Link>
      }</p>
      <p>
        <Link href="/private">
          <a>Private page</a>
        </Link>
      </p>
      {session && (
        <>
          <h4>Session:</h4>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </>
      )}
    </div>
  )
}

export default IndexPage
