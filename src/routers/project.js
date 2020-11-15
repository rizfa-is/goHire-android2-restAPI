const { Router } = require('express')
const router = Router()
const { getAllProject, getProjectById, createProject, deleteProject, updateProject, parsialUpdateProject } = require('../controllers/project')

router.get('/project', getAllProject)
router.get('/project/:pj_id', getProjectById)
router.patch('/project/create', parsialUpdateProject)
router.post('/hire/create', createProject)

module.exports = router
