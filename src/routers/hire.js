const { Router } = require('express')
const router = Router()
const { getAllHire, getHireById, createHire, deleteHire, updateHire } = require('../controllers/hire')
const { authorizationCompany, authorizationAll } = require('../middleware/authorize')

router.get('/hire', authorizationAll, getAllHire)
router.get('/hire/:hrId', authorizationAll, getHireById)
router.put('/hire/update/:hrId', authorizationAll, updateHire)
router.post('/hire/create', authorizationCompany, createHire)
router.delete('/hire/:hrId', authorizationCompany, deleteHire)

module.exports = router
