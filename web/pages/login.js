import { useRouter } from 'next/router'

const LoginPage = () => {
  const { query: { redirect } } = useRouter()
  const googleLoginUrl = '/api/auth/google' + (redirect ? `?${new URLSearchParams({ redirect })}` : '')
  return (
    <div>
      <p>
        <a href={googleLoginUrl}>
          Log in with Google
        </a>
      </p>
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
