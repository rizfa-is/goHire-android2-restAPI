// require('body-parser').config()
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const db = require('./src/helpers/db')
const router = require('./src/routers/general')
const port = process.env.PORT

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', router)

app.get('/', (req, res) => {
  res.send('Welcome to GoHire')
})

app.listen(port, () => {
  console.log(`Listen GoHire backend on port ${port}`)
})
