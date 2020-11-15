const Router = require('express')
const router = Router()
const { createExperience } = require('../controllers/experience')

router.post('/signup', createExperience)

module.exports = router
