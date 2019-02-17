// ROUTES
const webhookRouter = require('express').Router()

const {sendEmailHandler} = require('./send-email/index.js')
const {sendEmailMiddlewareRouter} = require('./send-email/middleware.js')

// webhookRouter.get('/', (req, res, next) => res.send('/webhook is active and waiting for req to subroute ...'))
webhookRouter.use('/send-email', sendEmailMiddlewareRouter, sendEmailHandler)

module.exports = {webhookRouter}
