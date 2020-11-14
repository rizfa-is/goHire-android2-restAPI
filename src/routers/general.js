const Router = require('express')
const router = Router()
const { createEngineerAccount, getAcEnCp, createCompanyAccount, getAllEngineer, getAllAbility } = require('../controllers/general')

// == Login Page ==
// Register engineer
router.post('/signup/engineer', createEngineerAccount)
// Register company
router.post('/signup/company', createCompanyAccount)

// Home Page

// Engineer List Page
router.get('/list/engineer', getAllEngineer)
router.get('/list/engineer/ability/:en_id', getAllAbility)
router.get('/list', getAcEnCp)

module.exports = router
