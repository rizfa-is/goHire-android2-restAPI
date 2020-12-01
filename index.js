require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const acccount = require('./src/routers/account')
const project = require('./src/routers/project')
const hire = require('./src/routers/hire')
const engineer = require('./src/routers/engineer')
const ability = require('./src/routers/ability')
const experience = require('./src/routers/experience')
const portfolio = require('./src/routers/portfolio')
const company = require('./src/routers/company')
const morgan = require('morgan')
const cors = require('cors')
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use('/', acccount)
app.use('/', project)
app.use('/', hire)
app.use('/', engineer)
app.use('/', ability)
app.use('/', experience)
app.use('/', portfolio)
app.use('/', company)

app.use('/image', express.static('./uploads'))

app.get('/', (req, res) => {
  res.send('Welcome to GoHire')
})

app.listen(port, () => {
  console.log(`Listen GoHire backend on port ${port}`)
})
