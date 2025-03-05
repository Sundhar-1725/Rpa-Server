const express = require('express');
const api = express.Router()
const registerRouter = require('./router/registerRouter')
const emrRouter = require('./router/emrRouter')

api.use('/user',registerRouter)
api.use('/emr',emrRouter)


module.exports = api