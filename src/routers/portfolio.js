const Router = require('express')
const router = Router()
const { createPortfolio } = require('../controllers/portfolio')

router.post('/signup', createPortfolio)

module.exports = router
