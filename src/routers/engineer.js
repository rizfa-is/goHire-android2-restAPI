const Router = require('express')
const router = Router()
const { getAllEngineer, getEngineerById, updateEngineer } = require('../controllers/engineer')
const { authorizationEngineer } = require('../middleware/authorize')
const uploadImage = require('../middleware/multer')

router.get('/engineer', authorizationEngineer, getAllEngineer)
router.get('/engineer/:en_id', authorizationEngineer, getEngineerById)
// router.put('/account/engineer/update/:ac_id', uploadImage, updateEngineer)

module.exports = router
