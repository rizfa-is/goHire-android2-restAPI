const Router = require('express')
const router = Router()
const { createEngineer } = require('../controllers/engineer')

router.post('/signup', createEngineer)

module.exports = router
