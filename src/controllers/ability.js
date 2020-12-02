const { createAbilityModel, getAllAbilityModel, getAbilityByAbIdModel, deleteAbilityModel, updateAbilityModel } = require('../models/ability')
const { successGetHandling, successGetByIdHandling, failGetByIdHandling, methodErrorHandling, errorInternalHandling, successCreateHandling, failCreateHandling, successDeleteHandling, failDeleteHandling, successUpdateHandling, failUpdateHandling } = require('../helpers/respons-handling')
const scope = 'ability'

module.exports = {
  getAllAbility: async (req, res) => {
    try {
      let { search, limit, page } = req.query
      let searchKey = ''
      let searchValue = ''

      if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'ab_name'
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

      const result = await getAllAbilityModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        successGetHandling(res, result, scope)
      } else {
        methodErrorHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getAbilityById: async (req, res) => {
    try {
      const { abId } = req.params
      const result = await getAbilityByAbIdModel(abId)
      if (result.length) {
        successGetByIdHandling(res, scope, abId, result)
      } else {
        failGetByIdHandling(res, scope, abId)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  createAbility: async (req, res) => {
    try {
      const data = req.body
      const result = await createAbilityModel(data)
      if (result.affectedRows) {
        successCreateHandling(res, scope)
      } else {
        failCreateHandling(res, scope)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  deleteAbility: async (req, res) => {
    try {
      const { abId } = req.params
      const result = await getAbilityByAbIdModel(abId)
      if (result.length) {
        const result2 = await deleteAbilityModel(abId)
        if (result2.affectedRows) {
          successDeleteHandling(res, abId, scope)
        } else {
          failDeleteHandling(res, scope, abId)
        }
      } else {
        failDeleteHandling(res, scope, abId)
      }
    } catch (error) {
      methodErrorHandling(res, scope)
    }
  },
  updateAbility: async (req, res) => {
    try {
      const { abId } = req.params
      const data = req.body
      const result = await getAbilityByAbIdModel(abId)
      console.log(result)
      if (result.length) {
        const result2 = await updateAbilityModel(abId, data)
        if (result2.affectedRows) {
          successUpdateHandling(res, abId, scope)
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
