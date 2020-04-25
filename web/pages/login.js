import { useRouter } from 'next/router'

const LoginPage = () => {
  const { query: { redirect } } = useRouter()
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

LoginPage.getInitialProps = ({ session, query, redirect }) => {
  if (session) {
    redirect(query.redirect || '/', 'replace')
  }
  return {}
}

export default LoginPage
