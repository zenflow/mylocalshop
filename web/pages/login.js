import { useRouter } from 'next/router'
import { useSession } from '../hooks/session'
import { Redirect } from '../components/redirects'

const LoginPage = () => {
  const session = useSession()
  const { query: { redirect } } = useRouter()

  if (session) {
    return <Redirect to={redirect || '/'} action="replace"/>
  }

  const googleLoginUrl = '/api/auth/google' + (redirect ? `?${new URLSearchParams({ redirect })}` : '')

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>
        <a href={googleLoginUrl}>
          Log in with Google
        </a>
      </h2>
    </div>
  )
}

export default LoginPage
