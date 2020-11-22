const { createAbilityModul, getAllAbilityModul, getAbilityByIdModul, deleteAbilityModul, updateAbilityModul } = require('../models/ability')
const { successGetHandling, successGetByIdHandling, failGetByIdHandling, methodErrorHandling, errorInternalHandling, successCreateHandling, failCreateHandling, successDeleteHandling, failDeleteHandling, successUpdateHandling, failUpdateHandling } = require('../helpers/respons-handling')
const scope = 'ability'

module.exports = {
  getAllAbility: async (req, res) => {
    try {
      const result = await getAllAbilityModul()
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
      const { ab_id } = req.params
      const result = await getAbilityByIdModul(ab_id)
      if (result.length) {
        successGetByIdHandling(res, scope, ab_id, result)
      } else {
        failGetByIdHandling(res, scope, ab_id)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  createAbility: async (req, res) => {
    try {
      const data = req.body
      const result = await createAbilityModul(data)
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
      const { ab_id } = req.params
      const result = await getAllAbilityModul(ab_id)
      if (result.length) {
        const result2 = await deleteAbilityModul(ab_id)
        if (result2.affectedRows) {
          successDeleteHandling(res, ab_id, scope)
        } else {
          failDeleteHandling(res, scope, ab_id)
        }
      } else {
        failDeleteHandling(res, scope, ab_id)
      }
    } catch (error) {
      methodErrorHandling(res, scope)
    }
  },
  updateAbility: async (req, res) => {
    try {
      const { ab_id } = req.params
      const data = req.body
      const result = await getAbilityByIdModul(ab_id)
      if (result.length) {
        const result2 = await updateAbilityModul(ab_id, data)
        if (result2.affectedRows) {
          successUpdateHandling(res, ab_id, scope)
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
