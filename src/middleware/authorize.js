require('dotenv')
const jwt = require('jsonwebtoken')

module.exports = {
  authorizationEngineer: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.JWT_KEY, (error, result) => {
        if (error && (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError')) {
          res.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          if (result.level === 'Engineer' || result.level === 'Admin') {
            next()
          } else {
            res.status(403).send({
              success: false,
              message: 'You don\'t have authorization to access this service'
            })
          }
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'Please login first!'
      })
    }
  },
  authorizationCompany: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.JWT_KEY, (error, result) => {
        if (error && (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError')) {
          res.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          if (result.level === 'Company' || result.level === 'Admin') {
            next()
          } else {
            res.status(403).send({
              success: false,
              message: 'You don\'t have authorization to access this service'
            })
          }
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'Please login first!'
      })
    }
  },
  authorizationAdmin: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.JWT_KEY, (error, result) => {
        if (error && (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError')) {
          res.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          if (result.level === 'Admin') {
            next()
          } else {
            res.status(403).send({
              success: false,
              message: 'You don\'t have authorization to access this service'
            })
          }
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'Please login first!'
      })
    }
  }
}
