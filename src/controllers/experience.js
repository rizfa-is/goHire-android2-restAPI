const { createExperienceModul, deleteExperienceModul, updateExperienceModul, getAllExperienceModul, getExperienceByIdModul } = require('../models/experience')
const { successProjectHandling, errorProjectHandling, errorInternalProjectHandling } = require('../helpers/error-handling')

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

      const result = await getAllExperienceModul(searchKey, searchValue, limit, offset)
      if (result.length) {
        successProjectHandling(res, result)
      } else {
        errorProjectHandling(res)
      }
    } catch (err) {
      errorInternalProjectHandling(res)
    }
  },
  getExperienceById: async (req, res) => {
    try {
      const { ex_id } = req.params

      const result = await getExperienceByIdModul(ex_id)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Experience with id ${ex_id}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Data experience with id ' + ex_id + ' not found'
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
  createExperience: async (req, res) => {
    try {
      const data = req.body
      const result = await createExperienceModul(data)

      if (result.affectedRows) {
        successProjectHandling(res, result)
      } else {
        errorProjectHandling(res)
      }
    } catch (error) {
      errorInternalProjectHandling(res)
    }
  },
  deleteExperience: async (req, res) => {
    try {
      const { ex_id } = req.params

      const result = await getExperienceByIdModul(ex_id)
      if (result.length) {
        const result2 = await deleteExperienceModul(ex_id)
        if (result2.affectedRows) {
          res.status(200).send({
            success: true,
            message: `Item experience id ${ex_id} has been deleted!`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item experience failed to delete!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'Item experience failed to delete!'
        })
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Data experience not found'
      })
    }
  },
  updateExperience: async (req, res) => {
    try {
      const { ex_id } = req.params
      const data = req.body

      const result = await getExperienceByIdModul(ex_id)
      if (result.length) {
        const result2 = await updateExperienceModul(ex_id, data)
        if (result2.affectedRows) {
          res.status(200).send({
            success: true,
            message: `Item experience id ${ex_id} has been updated!`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item experience failed to updated!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'Item experience failed to updated!'
        })
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Data experience not found'
      })
    }
  }
}
