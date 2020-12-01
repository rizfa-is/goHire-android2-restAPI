const Router = require('express')
const router = Router()
const { getAllEngineer, getEngineerById } = require('../controllers/engineer')
const { authorizationEngineer } = require('../middleware/authorize')

router.get('/engineer', authorizationEngineer, getAllEngineer)
router.get('/engineer/:enId', authorizationEngineer, getEngineerById)

module.exports = router
