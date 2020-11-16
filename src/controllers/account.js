const { createAccountModul, updateAccountModul, deleteAccountModul } = require('../models/account')

const { successRegisterHandling, errorHandling, errorInternalHandling } = require('../helpers/error-handling')

module.exports = {
  createEngineerAccount: async (req, res) => {
    try {
      const { ac_name, ac_email, ac_phone, ac_password } = req.body
      const data = {
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: ac_password, ac_level: 'Engineer'
      }

      console.log(req.body.ac_name)
      const result = await createAccountModul(data, 'Engineer')

      if (result.affectedRows) {
        successRegisterHandling(res, result)
      } else {
        errorHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  createCompanyAccount: async (req, res) => {
    try {
      const { ac_name, ac_email, ac_phone, ac_password, cp_company, cp_position } = req.body
      const data = {
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: ac_password, ac_level: 'Company'
      }

      const result = await createAccountModul(data, 'Company', cp_company, cp_position)

      if (result.affectedRows) {
        successRegisterHandling(res, result)
      } else {
        errorHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  updateEngineerAccount: async (req, res) => {
    try {
      const { ac_id } = req.params
      const { ac_name, ac_email, ac_phone, ac_password, 
        en_job_title, en_location, en_job_type, en_desc, en_avatar } = req.body
      const data = {
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: ac_password
      }

      const result = await updateAccountModul(ac_id, data, 'Engineer', en_job_title, en_location, en_job_type, en_desc, en_avatar)
      console.log(result)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: `Item project id ${ac_id} has been updated!`
        })
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
  },
  updateCompanyAccount: async (req, res) => {
    try {
      const { ac_id } = req.params
      const { ac_name, ac_email,
        cp_company, cp_position, cp_field, cp_location, cp_img } = req.body
      const data = {
        ac_name: ac_name, ac_email: ac_email
      }

      const result = await updateAccountModul(ac_id, data, 'Company', cp_company, cp_position, cp_field, cp_location, cp_img)
      console.log(result)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: `Item project id ${ac_id} has been updated!`
        })
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
  },
  deleteEngineerAccount: async (req, res) => {
    try {
      const { ac_id } = req.params

      const result = await deleteAccountModul(ac_id, 'Engineer')
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: `Item project id ${ac_id} has been deleted!`
        })
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
  deleteCompanyAccount: async (req, res) => {
    try {
      const { ac_id } = req.params

      const result = await deleteAccountModul(ac_id, 'Company')
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: `Item project id ${ac_id} has been deleted!`
        })
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
  }
}
