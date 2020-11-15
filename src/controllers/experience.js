const { createExperienceModul } = require('../models/experience')
const { successRegisterHandling, errorRegisterHandling, errorInternalHandling } = require('../helpers/error-handling')

module.exports = {
  createExperience: async (req, res) => {
    try {
      const { en_id } = req.body
      const data = {
        en_id: en_id
      }

      const result = await createExperienceModul(data)

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
