const { createAbilityModul, getAllAbilityModul, getAbilityByIdModul, deleteAbilityModul, updateAbilityModul } = require('../models/ability')
const { successRegisterHandling, errorRegisterHandling, errorInternalHandling } = require('../helpers/error-handling')
const errorHandling = require('../helpers/error-handling')

module.exports = {
  getAllAbility: async (req, res) => {
    try {
      const result = await getAllAbilityModul()
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
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
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
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
        successRegisterHandling(res, result)
      } else {
        errorHandling(res)
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
          res.status(200).send({
            success: true,
            message: `Item project id ${ab_id} has been deleted!`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item project failed to delete!'
          })
        }
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
  updateAbility: async (req, res) => {
    try {
      const { ab_id } = req.params
      const data = req.body

      const result = await getAbilityByIdModul(ab_id)
      if (result.length) {
        const result2 = await updateAbilityModul(ab_id, data)
        if (result2.affectedRows) {
          res.status(200).send({
            success: true,
            message: `Item project id ${ab_id} has been updated!`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item project failed to updated!'
          })
        }
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
