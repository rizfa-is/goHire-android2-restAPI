const { getAllProjectModul, getProjectByIdModul, createProjectModul, deleteProjectModul, updateProjectModul } = require('../models/project')
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

      const result = await getAllProjectModul(searchKey, searchValue, limit, offset)
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
      const { pj_id } = req.params
      const result = await getProjectByIdModul(pj_id)
      if (result.length) {
        successGetByIdHandling(res, scope, pj_id, result)
      } else {
        failGetByIdHandling(res, scope, pj_id)
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
        pj_img: req.files === undefined ? '' : req.files.pj_img[0].filename,
        pj_created_at: now,
        pj_updated_at: now
      }
      const result = await createProjectModul(setData)
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
      const { pj_id } = req.params
      const result = await getProjectByIdModul(pj_id)
      if (result.length) {
        const result2 = await deleteProjectModul(pj_id)
        if (result2.affectedRows) {
          successDeleteHandling(res, pj_id, scope)
        } else {
          failDeleteHandling(res, scope, pj_id)
        }
      } else {
        failDeleteHandling(res, scope, pj_id)
      }
    } catch (error) {
      methodErrorHandling(res, scope)
    }
  },
  updateProject: async (req, res) => {
    try {
      const { pj_id } = req.params
      const data = req.body
      const setData = {
        ...data,
        pj_img: req.files === undefined ? '' : req.files.pj_img[0].filename,
        pj_updated_at: now
      }
      const result = await getProjectByIdModul(pj_id)
      if (result.length) {
        const result2 = await updateProjectModul(pj_id, setData)
        if (result2.affectedRows) {
          successUpdateHandling(res, pj_id, scope)
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
