import GoogleStrategy from 'passport-google-oauth20/lib'
import { adminGraphql, gqlStr } from '../../adminGraphql'

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const callbackURL = '/api/auth/google/callback'

const callbackify = fn => (...args) => {
  const cb = args.pop()
  fn(...args).then(result => cb(null, result), error => cb(error))
}

export const googleStrategy = new GoogleStrategy(
  { clientID, clientSecret, callbackURL },
  callbackify(async (accessToken, refreshToken, profile) => {

    const userDataFromGoogle = {
      email: profile._json.email,
      first_name: profile._json.given_name,
      last_name: profile._json.family_name,
      picture: profile._json.picture,
      locale: profile._json.locale,
      google_id: profile.id,
    }

    let userId = await queryUserIdFromGoogleId(profile.id)
    if (userId) {
      // TODO: check if user fields need updating
    } else {
      userId = (await insertUser(userDataFromGoogle, 'id')).id
    }

    const sessionData = {
      provider: 'google',
      token: accessToken,
      user_id: userId,
    }
    const sessionQuery = `
      id
      created_at
      user { id email first_name last_name picture locale google_id }
    `
    const session = await insertSession(sessionData, sessionQuery)

    return session
  })
)

async function queryUserIdFromGoogleId (googleId) {
  const query = `
    query ($google_id: String) {
      users(where: {google_id: {_eq: $google_id}}) {
        id
      } 
    }
  `
  const variables = {
    google_id: googleId,
  }
  const {data} = await adminGraphql(query, variables)
  return data.users[0]?.id
}

async function insertUser (userData, userQuery) {
  const query = `
    mutation ($userData: users_insert_input!) {
      insert_users (objects: [$userData]) {
        returning {
          ${userQuery.trim()}
        }
      }
    }
  `
  const {data} = await adminGraphql(query, {userData})
  return data.insert_users.returning[0]
}

async function insertSession (sessionData, sessionQuery) {
  const query = `
    mutation ($sessionData: sessions_insert_input!) {
      insert_sessions (objects: [$sessionData]) {
        returning {
          ${sessionQuery.trim()}
        }
      }
    }
  `
  const {data} = await adminGraphql(query, {sessionData})
  return data.insert_sessions.returning[0]
}
