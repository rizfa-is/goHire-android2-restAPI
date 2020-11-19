const { Router } = require('express')
const router = Router()
const { getAllPortfolio, getPortfolioById, createPortfolio, deletePortfolio, updatePortfolio } = require('../controllers/portfolio')
const uploadImage = require('../middleware/multer')

router.get('/portfolio', getAllPortfolio)
router.get('/portfolio/:pr_id', getPortfolioById)
router.put('/portfolio/update/:pr_id', uploadImage, updatePortfolio)
router.post('/portfolio/create', uploadImage, createPortfolio)
router.delete('/portfolio/:pr_id', deletePortfolio)

module.exports = router
