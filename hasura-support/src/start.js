const server = require('./server')

const { PORT } = process.env

server.listen(PORT, error => {
  if (error) {
    console.error(error)
    process.exit(1)
  }
  console.log(`Listening on ${PORT}...`)
})
