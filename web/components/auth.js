import { useSession } from '../hooks/session'
import { RedirectToLogin } from './redirects'

export const Protected = ({ condition = true, children = null }) => {
  const session = useSession()
  const accessGranted = typeof condition === 'function' ? condition(session?.user) : condition
  if (!accessGranted) {
    return session
      ? <h1>Access Denied</h1>
      : <RedirectToLogin/>
  }
  return <>{children}</>
}
