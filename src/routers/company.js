const Router = require('express')
const router = Router()
const { getAllCompany, getCompanyById } = require('../controllers/company')
const { authorizationCompany } = require('../middleware/authorize')

router.get('/company', authorizationCompany, getAllCompany)
router.get('/company/:cpId', authorizationCompany, getCompanyById)

module.exports = router
