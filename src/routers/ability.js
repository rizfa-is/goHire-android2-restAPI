const Router = require('express')
const router = Router()
const { createAbility } = require('../controllers/ability')

router.post('/signup', createAbility)

module.exports = router
