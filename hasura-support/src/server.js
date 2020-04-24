const express = require('express')
const routes = require('./routes')

const server = express()
routes.forEach(route => route(server))

module.exports = server
