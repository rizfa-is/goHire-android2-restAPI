const { getAllCompanyModul, getCompanyByIdModul } = require('../models/company')
const { successRegisterHandling, errorRegisterHandling, errorInternalHandling } = require('../helpers/error-handling')

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
      const result = await getAllCompanyModul(searchKey, searchValue, limit, offset, filter)
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getCompanyById: async (req, res) => {
    try {
      const { cp_id } = req.params
      const result = await getCompanyByIdModul(cp_id)
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  }
}
