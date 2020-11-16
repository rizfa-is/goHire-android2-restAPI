// require('body-parser').config()
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const router = require('./src/routers/account')
const router2 = require('./src/routers/project')
const router3 = require('./src/routers/hire')
const router4 = require('./src/routers/engineer')
const router5 = require('./src/routers/ability')
const router6 = require('./src/routers/experience')
const router7 = require('./src/routers/portfolio')
const router8 = require('./src/routers/company')
const port = process.env.PORT

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
// Login, Register
app.use('/', router)
// Project
app.use('/', router2)
// Hire
app.use('/', router3)
// Engineer
app.use('/', router4)
// Ability
app.use('/', router5)
// Experience
app.use('/', router6)
// Portfolio
app.use('/', router7)
// Company
app.use('/', router8)

app.get('/', (req, res) => {
  res.send('Welcome to GoHire')
})

app.listen(port, () => {
  console.log(`Listen GoHire backend on port ${port}`)
})
