const { Router } = require('express')
const router = Router()
const { getAllProject, getProjectById, createProject, deleteProject, updateProject } = require('../controllers/project')

router.get('/project', getAllProject)
router.get('/project/:pj_id', getProjectById)
router.put('/project/update/:pj_id', updateProject)
router.post('/project/create', createProject)
router.delete('/project/:pj_id', deleteProject)

module.exports = router
