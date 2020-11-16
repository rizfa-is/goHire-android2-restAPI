const Router = require('express')
const router = Router()
const { createAbility, getAllAbility, getAbilityById, deleteAbility, updateAbility } = require('../controllers/ability')

router.get('/ability', getAllAbility)
router.get('/ability/:ab_id', getAbilityById)
router.put('/ability/update/:ab_id', updateAbility)
router.post('/ability/create', createAbility)
router.delete('/ability/:ab_id', deleteAbility)

module.exports = router
