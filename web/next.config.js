require('dotenv').config()

const {
  HASURA_ENGINE_ENDPOINT,
} = process.env

module.exports = {
  env: {
    HASURA_ENGINE_ENDPOINT,
  },
  webpack (config) {
    config.module.rules.push({
      test: /\.(png|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
    })
    return config
  },
}
