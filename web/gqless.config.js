require('dotenv').config()

module.exports = {
  url: process.env.HASURA_GRAPHQL_ENDPOINT,
  outputDir: 'gqless',
}
