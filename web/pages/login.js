import { useRouter } from 'next/router'
import { Header, Message, Icon } from 'semantic-ui-react'

const LoginPage = () => {
  const { query: { redirect } } = useRouter()
  const googleLoginUrl = '/api/auth/google' + (redirect ? `?${new URLSearchParams({ redirect })}` : '')
  return (
    <div style={{ textAlign: 'center' }}>
      <Message style={{ display: 'inline-block' }}>
        <Header as='h2'>
          <a href={googleLoginUrl}>
            <Icon name='google'/>
            Log in with Google
          </a>
        </Header>
      </Message>
    </div>
  )
}

LoginPage.getInitialProps = ({ session, query, redirect }) => {
  if (session) {
    redirect(query.redirect || '/', 'replace')
  }
  return {}
}

export default LoginPage
