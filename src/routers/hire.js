const { Router } = require('express')
const router = Router()
const { getAllHire, getHireById, createHire, deleteHire, updateHire } = require('../controllers/hire')

router.get('/hire', getAllHire)
router.get('/hire/:hr_id', getHireById)
router.put('/hire/update/:hr_id', updateHire)
router.post('/hire/create', createHire)
router.delete('/hire/:hr_id', deleteHire)

module.exports = router
