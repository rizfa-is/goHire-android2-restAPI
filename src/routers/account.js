const Router = require('express')
const router = Router()
const { createEngineerAccount, createCompanyAccount, updateEngineerAccount, deleteEngineerAccount, updateCompanyAccount, deleteCompanyAccount, loginAccount } = require('../controllers/account')
const uploadImage = require('../middleware/multer')

// == Login Page ==
// Register engineer
router.post('/signup/engineer', createEngineerAccount)
// Register company
router.post('/signup/company', createCompanyAccount)
// Login
router.post('/login', loginAccount)

// Account Setting
// Engineer
router.put('/account/engineer/update/:ac_id', uploadImage, updateEngineerAccount)
router.delete('/account/engineer/:ac_id', deleteEngineerAccount)
// Company
router.put('/account/company/update/:ac_id', uploadImage, updateCompanyAccount)
router.delete('/account/company/:ac_id', deleteCompanyAccount)
module.exports = router
