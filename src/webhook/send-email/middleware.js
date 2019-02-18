const sendEmailMiddlewareRouter = require('express').Router()
const {transporter} = require('./transporter.js')
const Joi = require('joi')

sendEmailMiddlewareRouter.use((req, res, next) => {
  transporter.verify()
  .then(() => {
    res.status(200)
    next()
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err)
  })
})

const bodyReqSchema = Joi.object().keys({
  from: Joi.string().email().required(),
  to: Joi.string().email(),
  subject: Joi.string(),
  text: Joi.string().required(),
})

sendEmailMiddlewareRouter.use((req, res, next) => {
  Joi.validate(req.body, bodyReqSchema, (error, value) => {
    if (error) {
      console.log(error);
      res.status(400).send(`Bad request for req.body structure: ${error}`)
    } else {
      res.status(200)
      next()
    }
  })
})

module.exports = {sendEmailMiddlewareRouter}
