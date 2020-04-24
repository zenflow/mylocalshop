import Link from 'next/link'
import { Header } from 'semantic-ui-react'
import { graphql } from '@gqless/react'
import { useUser } from '../lib/auth/react'

const IndexPage = graphql(() => {
  const user = useUser()
  return (
    <div style={{ textAlign: 'center' }}>
      <Header as='h2'>
        {user
          ? <>Welcome, {user.firstName}!</>
          : <>Please <Link href="/login"><a>Log in </a></Link> to continue</>
        }
      </Header>
    </div>
  )
})

export default IndexPage
