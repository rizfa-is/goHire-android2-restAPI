const { getAllEngineerModel, getEngineerByIdModel } = require('../models/engineer')
const { errorInternalHandling, failGetByIdHandling, methodErrorHandling, successGetHandling, successGetByIdHandling } = require('../helpers/respons-handling')
const scope = 'engineer'

module.exports = {
  getAllEngineer: async (req, res) => {
    try {
      let { search, limit, page, filter } = req.query
      let searchKey = ''
      let searchValue = ''

      if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'ac_name'
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

      if (!filter) {
        filter = 0
      } else {
        filter = parseInt(filter)
      }

      const offset = (page - 1) * limit
      const result = await getAllEngineerModel(searchKey, searchValue, limit, offset, filter)

      if (result.length) {
        successGetHandling(res, result, scope)
      } else {
        methodErrorHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getEngineerById: async (req, res) => {
    try {
      const { enId } = req.params
      const result = await getEngineerByIdModel(enId)
      if (result.length) {
        successGetByIdHandling(res, scope, enId, result)
      } else {
        failGetByIdHandling(res, scope, enId)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  }
}
