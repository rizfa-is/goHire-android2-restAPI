const { Router } = require('express')
const router = Router()
const { getAllPortfolio, getPortfolioById, createPortfolio, deletePortfolio, updatePortfolio } = require('../controllers/portfolio')

router.get('/portfolio', getAllPortfolio)
router.get('/portfolio/:pr_id', getPortfolioById)
router.put('/portfolio/update/:pr_id', updatePortfolio)
router.post('/portfolio/create', createPortfolio)
router.delete('/portfolio/:pr_id', deletePortfolio)

module.exports = router
