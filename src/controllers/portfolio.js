const { createPortfolioModul, deletePortfolioModul, updatePortfolioModul, getAllPortfolioModul, getPortfolioByIdModul } = require('../models/portfolio')
const { successGetHandling, successGetByIdHandling, failGetByIdHandling, methodErrorHandling, errorInternalHandling, successCreateHandling, failCreateHandling, successDeleteHandling, failDeleteHandling, successUpdateHandling, failUpdateHandling } = require('../helpers/respons-handling')
const scope = 'portfolio'

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
        successGetHandling(res, result, scope)
      } else {
        methodErrorHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getPortfolioById: async (req, res) => {
    try {
      const { pr_id } = req.params
      const result = await getPortfolioByIdModul(pr_id)
      if (result.length) {
        successGetByIdHandling(res, scope, pr_id, result)
      } else {
        failGetByIdHandling(res, scope, pr_id)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  createPortfolio: async (req, res) => {
    try {
      const data = req.body
      const setData = {
        ...data,
        pr_img: req.files === undefined ? '' : req.files.pr_img[0].filename
      }
      const result = await createPortfolioModul(setData)
      if (result.affectedRows) {
        successCreateHandling(res, scope)
      } else {
        failCreateHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  deletePortfolio: async (req, res) => {
    try {
      const { pr_id } = req.params
      const result = await getPortfolioByIdModul(pr_id)
      if (result.length) {
        const result2 = await deletePortfolioModul(pr_id)
        if (result2.affectedRows) {
          successDeleteHandling(res, pr_id, scope)
        } else {
          failDeleteHandling(res, scope, pr_id)
        }
      } else {
        failDeleteHandling(res, scope, pr_id)
      }
    } catch (error) {
      methodErrorHandling(res, scope)
    }
  },
  updatePortfolio: async (req, res) => {
    try {
      const { pr_id } = req.params
      const data = req.body
      const setData = {
        ...data,
        pr_img: req.files === undefined ? '' : req.files.pr_img[0].filename
      }
      const result = await getPortfolioByIdModul(pr_id)
      if (result.length) {
        const result2 = await updatePortfolioModul(pr_id, setData)
        if (result2.affectedRows) {
          successUpdateHandling(res, pr_id, scope)
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
