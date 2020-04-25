import users from './users'
import sessions from './sessions'

export const getResources = () => {
  return {
    users: users(),
    sessions: sessions(),
  }
}
