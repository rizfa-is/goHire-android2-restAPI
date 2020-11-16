const Router = require('express')
const router = Router()
const { getAllCompany, getCompanyById } = require('../controllers/company')

router.get('/company', getAllCompany)
router.get('/company/:cp_id', getCompanyById)

module.exports = router
