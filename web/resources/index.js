import users from './users'
import sessions from './sessions'

export const getResources = (authorizationParams) => {
  return {
    users: users(authorizationParams),
    sessions: sessions(authorizationParams),
  }
}
