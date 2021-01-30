const { Router } = require('express')
const router = Router()
const { getAllProject, getProjectById, createProject, deleteProject, updateProject } = require('../controllers/project')
const { authorizationCompany } = require('../middleware/authorize')
const uploadImage = require('../middleware/multer')

router.get('/project', getAllProject)
router.get('/project/:pjId', authorizationCompany, getProjectById)
router.put('/project/update/:pjId', authorizationCompany, uploadImage, updateProject)
router.post('/project/create', authorizationCompany, uploadImage, createProject)
router.delete('/project/:pjId', authorizationCompany, deleteProject)

module.exports = router
