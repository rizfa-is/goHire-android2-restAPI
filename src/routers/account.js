const Router = require('express')
const router = Router()
const {
  createEngineerAccount, createCompanyAccount, createAdminAccount, updateEngineerAccount,
  deleteEngineerAccount, updateCompanyAccount, deleteCompanyAccount, updateAdminAccount,
  deleteAdminAccount, loginAccount, checkEmail, checkPassword
} = require('../controllers/account')

const { authorizationEngineer, authorizationCompany, authorizationAdmin } = require('../middleware/authorize')
const uploadImage = require('../middleware/multer')

router.post('/login', loginAccount)

router.post('/signup/engineer', createEngineerAccount)
router.put('/account/engineer/update/:acId', authorizationEngineer, uploadImage, updateEngineerAccount)
router.delete('/account/engineer/:acId', authorizationEngineer, deleteEngineerAccount)

router.post('/signup/company', createCompanyAccount)
router.put('/account/company/update/:acId', authorizationCompany, uploadImage, updateCompanyAccount)
router.delete('/account/company/:acId', authorizationCompany, deleteCompanyAccount)

router.post('/signup/admin', createAdminAccount)
router.put('/account/admin/update/:acId', authorizationAdmin, uploadImage, updateAdminAccount)
router.delete('/account/admin/:acId', authorizationAdmin, deleteAdminAccount)

router.post('/checkEmail', checkEmail)
router.post('/checkPassword', checkPassword)

module.exports = router
