const { getAllProjectModel, getProjectByIdModel, createProjectModel, deleteProjectModel, updateProjectModel } = require('../models/project')
const { successGetHandling, successGetByIdHandling, failGetByIdHandling, methodErrorHandling, errorInternalHandling, successCreateHandling, failCreateHandling, successDeleteHandling, failDeleteHandling, successUpdateHandling, failUpdateHandling } = require('../helpers/respons-handling')
const moment = require('moment')
const now = moment().format('YYYY-MM-DD HH:mm:ss')
const scope = 'project'

module.exports = {
  getAllProject: async (req, res) => {
    try {
      let { search, limit, page } = req.query
      let searchKey = ''
      let searchValue = ''

      if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'pj_name'
        searchValue = search || ''
      }

      if (!limit) {
        limit = 50
      } else {
        limit = parseInt(limit)
      }

      if (!page) {
        page = 1
      } else {
        page = parseInt(page)
      }

      const offset = (page - 1) * limit

      const result = await getAllProjectModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        successGetHandling(res, result, scope)
      } else {
        methodErrorHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getProjectById: async (req, res) => {
    try {
      const { pjId } = req.params
      const result = await getProjectByIdModel(pjId)
      if (result.length) {
        successGetByIdHandling(res, scope, pjId, result)
      } else {
        failGetByIdHandling(res, scope, pjId)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  createProject: async (req, res) => {
    try {
      const data = req.body
      const setData = {
        ...data,
        pj_img: req.files === undefined ? '' : req.file.filename,
        pj_created_at: now,
        pj_updated_at: now
      }
      const result = await createProjectModel(setData)
      if (result.affectedRows) {
        successCreateHandling(res, scope)
      } else {
        failCreateHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { pjId } = req.params
      const result = await getProjectByIdModel(pjId)
      if (result.length) {
        const result2 = await deleteProjectModel(pjId)
        if (result2.affectedRows) {
          successDeleteHandling(res, pjId, scope)
        } else {
          failDeleteHandling(res, scope, pjId)
        }
      } else {
        failDeleteHandling(res, scope, pjId)
      }
    } catch (error) {
      methodErrorHandling(res, scope)
    }
  },
  updateProject: async (req, res) => {
    try {
      const { pjId } = req.params
      const data = req.body
      const result = await getProjectByIdModel(pjId)

      const setData = {
        ...data,
        pj_img: req.file === undefined ? result[0].pj_img : req.file.filename,
        pj_updated_at: now
      }

      if (result.length) {
        const result2 = await updateProjectModel(pjId, setData)
        if (result2.affectedRows) {
          successUpdateHandling(res, pjId, scope)
        } else {
          failUpdateHandling(res, scope)
        }
      } else {
        failUpdateHandling(res, scope)
      }
    } catch (error) {
      methodErrorHandling(res, scope)
    }
  }
}
