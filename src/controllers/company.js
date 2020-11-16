const { createCompanyModul, getAllCompanyModul, getCompanyByIdModul, deleteCompanyModul, updateCompanyModul } = require('../models/company')
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
  },
  createCompany: async (req, res) => {
    try {
      const { ac_id } = req.body
      const data = {
        ac_id: ac_id
      }

      const result = await createCompanyModul(data)

      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  deleteEngineer: async (req, res) => {
    try {
      const { ac_id } = req.params

      const result = await deleteCompanyModul(ac_id)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: `Item project id ${ac_id} has been deleted!`
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item project failed to delete!'
        })
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Data project not found'
      })
    }
  },
  updateEngineer: async (req, res) => {
    try {
      const { ac_id } = req.params
      const data = req.body

      const result = await updateCompanyModul(ac_id, data)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: `Item project id ${ac_id} has been updated!`
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item project failed to updated!'
        })
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Data project not found'
      })
    }
  }
}
