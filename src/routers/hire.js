const { Router } = require('express')
const router = Router()
const { getAllHire, getHireById, createHire, deleteHire, updateHire } = require('../controllers/hire')
const { authorizationEngineer, authorizationCompany } = require('../middleware/authorize')

router.get('/hire', authorizationEngineer, authorizationCompany, getAllHire)
router.get('/hire/:hrId', authorizationEngineer, authorizationCompany, getHireById)
router.put('/hire/update/:hrId', authorizationCompany, updateHire)
router.post('/hire/create', authorizationCompany, createHire)
router.delete('/hire/:hrId', authorizationCompany, deleteHire)

module.exports = router
