// require('body-parser').config()
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const router = require('./src/routers/general')
const router2 = require('./src/routers/project')
const port = process.env.PORT

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
// Login, Home, Engineer List, Engineer Detail. Company Detail
app.use('/', router)
// Project, Hire
app.use('/', router2)

app.get('/', (req, res) => {
  res.send('Welcome to GoHire')
})

app.listen(port, () => {
  console.log(`Listen GoHire backend on port ${port}`)
})
