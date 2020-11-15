const Router = require('express')
const router = Router()
const {
  createEngineerAccount, getAcEnCp, createCompanyAccount, getAllEngineer, getAllAbility, getAbilityById, getEngineerById,
  getAllPortfolio, getPortfolioById, getAllExperience, getExperienceById, getAllCompany, getCompanyById
} = require('../controllers/general')

// == Login Page ==
// Register engineer
router.post('/signup/engineer', createEngineerAccount)
// Register company
router.post('/signup/company', createCompanyAccount)

// Home Page

// Engineer List Page
router.get('/list/engineer', getAllEngineer)
router.get('/list/engineer/:en_id', getEngineerById)
router.get('/list/ability', getAllAbility)
router.get('/list/ability/:en_id', getAbilityById)
// router.get('/list', getAcEnCp)

// Engineer Detail Page
router.get('/list/portfolio', getAllPortfolio)
router.get('/list/portfolio/:en_id', getPortfolioById)
router.get('/list/experience', getAllExperience)
router.get('/list/experience/:en_id', getExperienceById)

// Company Detail Page
router.get('/list/company', getAllCompany)
router.get('/list/company/:en_id', getCompanyById)

module.exports = router
