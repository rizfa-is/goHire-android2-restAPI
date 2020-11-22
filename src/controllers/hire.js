const { createHireModul, getAllHireModul, getHireByIdModul, deleteHireModul, updateHireModul } = require('../models/hire')
const { successGetHandling, successGetByIdHandling, failGetByIdHandling, methodErrorHandling, errorInternalHandling, successCreateHandling, failCreateHandling, successDeleteHandling, failDeleteHandling, successUpdateHandling, failUpdateHandling } = require('../helpers/respons-handling')
const moment = require('moment')
const now = moment().format('YYYY-MM-DD HH:mm:ss')
const scope = 'hiring'

module.exports = {
  getAllHire: async (req, res) => {
    try {
      let { search, limit, page } = req.query
      let searchKey = ''
      let searchValue = ''

      if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'hr_status'
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

      const result = await getAllHireModul(searchKey, searchValue, limit, offset)
      if (result.length) {
        successGetHandling(res, result, scope)
      } else {
        methodErrorHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getHireById: async (req, res) => {
    try {
      const { hr_id } = req.params

      const result = await getHireByIdModul(hr_id)
      if (result.length) {
        successGetByIdHandling(res, scope, hr_id, result)
      } else {
        failGetByIdHandling(res, scope, hr_id)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  createHire: async (req, res) => {
    try {
      const reqBody = req.body
      const data = {
        ...reqBody,
        hr_created_at: now
      }
      const result = await createHireModul(data)
      if (result.affectedRows) {
        successCreateHandling(res, scope)
      } else {
        failCreateHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  deleteHire: async (req, res) => {
    try {
      const { hr_id } = req.params

      const result = await getHireByIdModul(hr_id)
      if (result.length) {
        const result2 = await deleteHireModul(hr_id)
        if (result2.affectedRows) {
          successDeleteHandling(res, hr_id, scope)
        } else {
          failDeleteHandling(res, scope, hr_id)
        }
      } else {
        failDeleteHandling(res, scope, hr_id)
      }
    } catch (error) {
      methodErrorHandling(res, scope)
    }
  },
  updateHire: async (req, res) => {
    try {
      const { hr_id } = req.params
      const reqBody = req.body
      const data = {
        ...reqBody,
        hr_date_confirm: now
      }
      const result = await getHireByIdModul(hr_id)
      if (result.length) {
        const result2 = await updateHireModul(hr_id, data)
        if (result2.affectedRows) {
          successUpdateHandling(res, hr_id, scope)
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
