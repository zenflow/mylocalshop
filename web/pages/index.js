import Link from 'next/link'

import { useSession } from '../lib/auth/react'

const IndexPage = () => {
  const session = useSession()
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>
        {session && <>Welcome, user #{session.userId}!</>}
        {!session && <>Please <Link href="/login"><a>Log in </a></Link> to continue</>}
      </h2>
    </div>
  )
}

export default IndexPage
