const { getAllCompanyModel, getCompanyByIdModel } = require('../models/company')
const { methodErrorHandling, errorInternalHandling, failGetByIdHandling, successGetHandling, successGetByIdHandling } = require('../helpers/respons-handling')
const scope = 'company'

module.exports = {
  getAllCompany: async (req, res) => {
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
      const result = await getAllCompanyModel(searchKey, searchValue, limit, offset, filter)
      if (result.length) {
        successGetHandling(res, result, scope)
      } else {
        methodErrorHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getCompanyById: async (req, res) => {
    try {
      const { cpId } = req.params
      const result = await getCompanyByIdModel(cpId)
      if (result.length) {
        successGetByIdHandling(res, scope, cpId, result)
      } else {
        failGetByIdHandling(res, scope, cpId)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  }
}
