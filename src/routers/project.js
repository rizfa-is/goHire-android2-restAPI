const { Router } = require('express')
const router = Router()
const { getAllProject, getProjectById, createProject, deleteProject, updateProject } = require('../controllers/project')
const uploadImage = require('../middleware/multer')

router.get('/project', getAllProject)
router.get('/project/:pj_id', getProjectById)
router.put('/project/update/:pj_id', uploadImage, updateProject)
router.post('/project/create', uploadImage, createProject)
router.delete('/project/:pj_id', deleteProject)

module.exports = router
