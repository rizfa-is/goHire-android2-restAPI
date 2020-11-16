const Router = require('express')
const router = Router()
const { updateEngineer, deleteEngineer, getAllEngineer, getEngineerById } = require('../controllers/engineer')

router.get('/engineer', getAllEngineer)
router.get('/engineer/:en_id', getEngineerById)
router.put('/engineer/update/:en_id', updateEngineer)
router.delete('/engineer/:en_id', deleteEngineer)

module.exports = router
