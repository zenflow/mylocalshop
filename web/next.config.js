require('dotenv').config()

const {
  HASURA_GRAPHQL_ENDPOINT,
} = process.env

module.exports = {
  env: {
    HASURA_GRAPHQL_ENDPOINT,
  }
}
