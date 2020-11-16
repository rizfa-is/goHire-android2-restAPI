const { Router } = require('express')
const router = Router()
const { getAllExperience, getExperienceById, createExperience, deleteExperience, updateExperience } = require('../controllers/experience')

router.get('/experience', getAllExperience)
router.get('/experience/:ex_id', getExperienceById)
router.put('/experience/update/:ex_id', updateExperience)
router.post('/experience/create', createExperience)
router.delete('/experience/:ex_id', deleteExperience)

module.exports = router
