const { createCompanyModul } = require('../moduls/company')
const { successRegisterHandling, errorRegisterHandling, errorInternalHandling } = require('../helpers/error-handling')

module.exports = {
  createCompany: async (req, res) => {
    try {
      const { ac_id } = req.body
      const data = {
        ac_id: ac_id
      }

      const result = await createCompanyModul(data)

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
