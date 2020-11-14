const Router = require('express')
const router = Router()
const { createCompany } = require('../controllers/company')

router.post('/signup', createCompany)

module.exports = router
