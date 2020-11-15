const Router = require('express')
const router = Router()
const { createHire } = require('../controllers/hire')

router.post('/project/create', createHire)

module.exports = router
