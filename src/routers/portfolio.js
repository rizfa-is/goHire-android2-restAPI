const { Router } = require('express')
const router = Router()
const { getAllPortfolio, getPortfolioById, createPortfolio, deletePortfolio, updatePortfolio } = require('../controllers/portfolio')
const { authorizationEngineer } = require('../middleware/authorize')
const uploadImage = require('../middleware/multer')

router.get('/portfolio', authorizationEngineer, getAllPortfolio)
router.get('/portfolio/:prId', authorizationEngineer, getPortfolioById)
router.put('/portfolio/update/:prId', authorizationEngineer, uploadImage, updatePortfolio)
router.post('/portfolio/create', authorizationEngineer, uploadImage, createPortfolio)
router.delete('/portfolio/:prId', authorizationEngineer, deletePortfolio)

module.exports = router
