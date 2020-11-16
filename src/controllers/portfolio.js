const { createPortfolioModul, deletePortfolioModul, updatePortfolioModul, getAllPortfolioModul, getPortfolioByIdModul } = require('../models/portfolio')
const { successProjectHandling, errorProjectHandling, errorInternalProjectHandling } = require('../helpers/error-handling')

module.exports = {
  getAllPortfolio: async (req, res) => {
    try {
      let { search, limit, page } = req.query
      let searchKey = ''
      let searchValue = ''

      if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'pr_desc'
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

      const result = await getAllPortfolioModul(searchKey, searchValue, limit, offset)
      if (result.length) {
        successProjectHandling(res, result)
      } else {
        errorProjectHandling(res)
      }
    } catch (err) {
      errorInternalProjectHandling(res)
    }
  },
  getPortfolioById: async (req, res) => {
    try {
      const { pr_id } = req.params

      const result = await getPortfolioByIdModul(pr_id)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Portfolio with id ${pr_id}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Data portfolio with id ' + pr_id + ' not found'
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
  createPortfolio: async (req, res) => {
    try {
      const data = req.body
      const result = await createPortfolioModul(data)

      if (result.affectedRows) {
        successProjectHandling(res, result)
      } else {
        errorProjectHandling(res)
      }
    } catch (error) {
      errorInternalProjectHandling(res)
    }
  },
  deletePortfolio: async (req, res) => {
    try {
      const { pr_id } = req.params

      const result = await getPortfolioByIdModul(pr_id)
      if (result.length) {
        const result2 = await deletePortfolioModul(pr_id)
        if (result2.affectedRows) {
          res.status(200).send({
            success: true,
            message: `Item portfolio id ${pr_id} has been deleted!`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item portfolio failed to delete!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'Item portfolio failed to delete!'
        })
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Data portfolio not found'
      })
    }
  },
  updatePortfolio: async (req, res) => {
    try {
      const { pr_id } = req.params
      const data = req.body

      const result = await getPortfolioByIdModul(pr_id)
      if (result.length) {
        const result2 = await updatePortfolioModul(pr_id, data)
        if (result2.affectedRows) {
          res.status(200).send({
            success: true,
            message: `Item portfolio id ${pr_id} has been updated!`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item portfolio failed to updated!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'Item portfolio failed to updated!'
        })
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Data portfolio not found'
      })
    }
  }
}
