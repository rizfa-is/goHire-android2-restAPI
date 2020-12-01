const Router = require('express')
const router = Router()
const { createAbility, getAllAbility, getAbilityById, deleteAbility, updateAbility } = require('../controllers/ability')
const { authorizationEngineer } = require('../middleware/authorize')

router.get('/ability', authorizationEngineer, getAllAbility)
router.get('/ability/:abId', authorizationEngineer, getAbilityById)
router.put('/ability/update/:abId', authorizationEngineer, updateAbility)
router.post('/ability/create', authorizationEngineer, createAbility)
router.delete('/ability/:abId', authorizationEngineer, deleteAbility)

module.exports = router
