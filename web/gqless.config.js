require('dotenv').config()

module.exports = {
  url: `${process.env.HASURA_ENGINE_ENDPOINT}/v1/graphql`,
  outputDir: 'gqless',
  headers: {
    'X-Hasura-Admin-Secret': 'admin_secret',
  },
}
