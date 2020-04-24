import Link from 'next/link'
import { useSession } from '../lib/auth/react'
import { Header } from 'semantic-ui-react'

const IndexPage = () => {
  const session = useSession()
  return (
    <div style={{ textAlign: 'center' }}>
      <Header as='h2'>
        {session
          ? <>Welcome, {session.user.firstName}!</>
          : <>Please <Link href="/login"><a>Log in </a></Link> to continue</>
        }
      </Header>
    </div>
  )
}

export default IndexPage
