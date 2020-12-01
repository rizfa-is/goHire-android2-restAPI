const { createExperienceModel, deleteExperienceModel, updateExperienceModel, getAllExperienceModel, getExperienceByIdModel } = require('../models/experience')
const { successGetHandling, successGetByIdHandling, failGetByIdHandling, methodErrorHandling, errorInternalHandling, successCreateHandling, failCreateHandling, successDeleteHandling, failDeleteHandling, successUpdateHandling, failUpdateHandling } = require('../helpers/respons-handling')
const scope = 'experience'

module.exports = {
  getAllExperience: async (req, res) => {
    try {
      let { search, limit, page } = req.query
      let searchKey = ''
      let searchValue = ''

      if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'ex_company'
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

      const result = await getAllExperienceModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        successGetHandling(res, result, scope)
      } else {
        methodErrorHandling(res, scope)
      }
    } catch (err) {
      errorInternalHandling(res)
    }
  },
  getExperienceById: async (req, res) => {
    try {
      const { exId } = req.params

      const result = await getExperienceByIdModel(exId)
      if (result.length) {
        successGetByIdHandling(res, scope, exId, result)
      } else {
        failGetByIdHandling(res, scope, exId)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  createExperience: async (req, res) => {
    try {
      const data = req.body
      const result = await createExperienceModel(data)
      if (result.affectedRows) {
        successCreateHandling(res, scope)
      } else {
        failCreateHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  deleteExperience: async (req, res) => {
    try {
      const { exId } = req.params

      const result = await getExperienceByIdModel(exId)
      if (result.length) {
        const result2 = await deleteExperienceModel(exId)
        if (result2.affectedRows) {
          successDeleteHandling(res, exId, scope)
        } else {
          failDeleteHandling(res, scope, exId)
        }
      } else {
        failDeleteHandling(res, scope, exId)
      }
    } catch (error) {
      methodErrorHandling(res, scope)
    }
  },
  updateExperience: async (req, res) => {
    try {
      const { exId } = req.params
      const data = req.body
      const result = await getExperienceByIdModel(exId)
      if (result.length) {
        const result2 = await updateExperienceModel(exId, data)
        if (result2.affectedRows) {
          successUpdateHandling(res, exId, scope)
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
