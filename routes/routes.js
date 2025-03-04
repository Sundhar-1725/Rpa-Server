const express = require('express');
const api = express.Router()
const registerRouter = require('./router/registerRouter')

api.use('/user',registerRouter)


module.exports = api