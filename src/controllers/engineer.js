const { createEngineerModul } = require('../moduls/engineer')
const { successRegisterHandling, errorRegisterHandling, errorInternalHandling } = require('../helpers/error-handling')

module.exports = {
  createEngineer: async (req, res) => {
    try {
      const { ac_id } = req.body
      const data = {
        ac_id: ac_id
      }

      const result = await createEngineerModul(data)

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
