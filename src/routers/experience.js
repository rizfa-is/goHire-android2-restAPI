const { Router } = require('express')
const router = Router()
const { getAllExperience, getExperienceById, createExperience, deleteExperience, updateExperience } = require('../controllers/experience')
const { authorizationEngineer } = require('../middleware/authorize')

router.get('/experience', authorizationEngineer, getAllExperience)
router.get('/experience/:exId', authorizationEngineer, getExperienceById)
router.put('/experience/update/:exId', authorizationEngineer, updateExperience)
router.post('/experience/create', authorizationEngineer, createExperience)
router.delete('/experience/:exId', authorizationEngineer, deleteExperience)

module.exports = router
