const { createPortfolioModel, deletePortfolioModel, updatePortfolioModel, getAllPortfolioModel, getPortfolioByIdModel } = require('../models/portfolio')
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

      const result = await getAllPortfolioModel(searchKey, searchValue, limit, offset)
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
      const { prId } = req.params
      const result = await getPortfolioByIdModel(prId)
      if (result.length) {
        successGetByIdHandling(res, scope, prId, result)
      } else {
        failGetByIdHandling(res, scope, prId)
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
        pr_img: req.files === undefined ? '' : req.file.filename
      }
      const result = await createPortfolioModel(setData)
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
      const { prId } = req.params
      const result = await getPortfolioByIdModel(prId)
      if (result.length) {
        const result2 = await deletePortfolioModel(prId)
        if (result2.affectedRows) {
          successDeleteHandling(res, prId, scope)
        } else {
          failDeleteHandling(res, scope, prId)
        }
      } else {
        failDeleteHandling(res, scope, prId)
      }
    } catch (error) {
      methodErrorHandling(res, scope)
    }
  },
  updatePortfolio: async (req, res) => {
    try {
      const { prId } = req.params
      const data = req.body
      const result = await getPortfolioByIdModel(prId)
      const setData = {
        ...data,
        pr_img: req.file === undefined ? result[0].pr_img : req.file.filename
      }

      if (result.length) {
        const result2 = await updatePortfolioModel(prId, setData)
        if (result2.affectedRows) {
          successUpdateHandling(res, prId, scope)
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
