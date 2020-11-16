const { createHireModul, getAllHireModul, getHireByIdModul, deleteHireModul, updateHireModul } = require('../models/hire')
const { successHireHandling, errorHireHandling, errorInternalHireHandling } = require('../helpers/error-handling')

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
        successHireHandling(res, result)
      } else {
        errorHireHandling(res)
      }
    } catch (err) {
      errorInternalHireHandling(res)
    }
  },
  getHireById: async (req, res) => {
    try {
      const { hr_id } = req.params

      const result = await getHireByIdModul(hr_id)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Hire with id ${hr_id}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Data Hire with id ' + hr_id + ' not found'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  createHire: async (req, res) => {
    try {
      const data = req.body
      const result = await createHireModul(data)

      if (result.affectedRows) {
        successHireHandling(res, result)
      } else {
        errorHireHandling(res)
      }
    } catch (error) {
      errorInternalHireHandling(res)
    }
  },
  deleteHire: async (req, res) => {
    try {
      const { hr_id } = req.params

      const result = await getHireByIdModul(hr_id)
      if (result.length) {
        const result2 = await deleteHireModul(hr_id)
        if (result2.affectedRows) {
          res.status(200).send({
            success: true,
            message: `Hire id ${hr_id} has been updated!`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item project failed to update!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'Item project failed to update!'
        })
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Data project not found'
      })
    }
  },
  updateHire: async (req, res) => {
    try {
      const { hr_id } = req.params
      const data = req.body

      const result = await getHireByIdModul(hr_id)
      if (result.length) {
        const result2 = await updateHireModul(hr_id, data)
        if (result2.affectedRows) {
          res.status(200).send({
            success: true,
            message: `Hire id ${hr_id} has been updated!`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item project failed to update!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'Item project failed to update!'
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
