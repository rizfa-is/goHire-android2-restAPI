const { getAllEngineerModul, getEngineerByIdModul } = require('../models/engineer')
const { nestedJSONObjectEngineer, errorInternalHandling, failGetByIdHandling, methodErrorHandling } = require('../helpers/respons-handling')
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
      const result = await getAllEngineerModul(searchKey, searchValue, limit, offset, filter)
      if (result.length) {
        nestedJSONObjectEngineer(res, result, 0, 0)
      } else {
        methodErrorHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getEngineerById: async (req, res) => {
    try {
      const { en_id } = req.params
      const result = await getEngineerByIdModul(en_id)
      if (result.length) {
        nestedJSONObjectEngineer(res, result, 1, en_id)
      } else {
        failGetByIdHandling(res, scope, en_id)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  }
}
