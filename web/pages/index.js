import Link from 'next/link'
import { useSession } from '../lib/auth/react'

export default () => {
  const session = useSession()
  return (
    <div>
      <p>{session
        ? <a href="/api/auth/logout">Log out</a>
        : <a href="/api/auth/google">Log in</a>
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
