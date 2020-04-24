import GoogleStrategy from 'passport-google-oauth20/lib'
import { adminGraphql } from '../../adminGraphql'

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
      googleId: profile.id,
      email: profile._json.email,
      firstName: profile._json.given_name,
      lastName: profile._json.family_name,
      picture: profile._json.picture,
      locale: profile._json.locale,
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
      userId,
    }
    const sessionQuery = `
      id
      createdAt
      updatedAt
      user { id googleId email firstName lastName picture locale }
    `
    const session = await insertSession(sessionData, sessionQuery)

    return session
  }),
)

async function queryUserIdFromGoogleId (googleId) {
  const query = `
    query ($googleId: String) {
      users(where: {googleId: {_eq: $googleId}}) {
        id
      } 
    }
  `
  const { data } = await adminGraphql(query, { googleId })
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
  const { data } = await adminGraphql(query, { userData })
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
  const { data } = await adminGraphql(query, { sessionData })
  return data.insert_sessions.returning[0]
}
