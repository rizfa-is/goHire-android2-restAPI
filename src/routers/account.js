const Router = require('express')
const router = Router()
const { createEngineerAccount, createCompanyAccount, updateEngineerAccount, deleteEngineerAccount, updateCompanyAccount, deleteCompanyAccount } = require('../controllers/account')

// == Login Page ==
// Register engineer
router.post('/signup/engineer', createEngineerAccount)
// Register company
router.post('/signup/company', createCompanyAccount)

router.put('/account/engineer/update/:ac_id', updateEngineerAccount)
router.delete('/account/engineer/:ac_id', deleteEngineerAccount)

router.put('/account/company/update/:ac_id', updateCompanyAccount)
router.delete('/account/company/:ac_id', deleteCompanyAccount)
module.exports = router
