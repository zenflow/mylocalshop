require('dotenv').config()

const {
  HASURA_ENGINE_ENDPOINT,
} = process.env

module.exports = {
  env: {
    HASURA_ENGINE_ENDPOINT,
  },
}
