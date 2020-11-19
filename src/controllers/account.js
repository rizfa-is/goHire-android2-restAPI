require('dotenv')
const bcrypt = require('bcrypt')
const { createAccountModul, updateAccountModul, deleteAccountModul, checkExistedEmailModul } = require('../models/account')
const { successRegisterHandling, errorRegisterHandling, errorInternalHandling } = require('../helpers/error-handling')
const jwt = require('jsonwebtoken')

module.exports = {
  createEngineerAccount: async (req, res) => {
    try {
      const { ac_name, ac_email, ac_phone, ac_password } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(ac_password, salt)

      const data = {
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: encrypt, ac_level: 'Engineer'
      }
      const checkEmail = await checkExistedEmailModul(ac_email)
      if (checkEmail.length > 0) {
        errorRegisterHandling(res)
      } else {
        const result = await createAccountModul(data, 'Engineer')
        successRegisterHandling(res, result)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  createCompanyAccount: async (req, res) => {
    try {
      const { ac_name, ac_email, ac_phone, ac_password, cp_company, cp_position } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(ac_password, salt)
      const data = {
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: encrypt, ac_level: 'Company'
      }

      const checkEmail = await checkExistedEmailModul(ac_email)
      if (checkEmail.length > 0) {
        errorRegisterHandling(res)
      } else {
        const result = await createAccountModul(data, 'Company', cp_company, cp_position)
        successRegisterHandling(res, result)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  updateEngineerAccount: async (req, res) => {
    try {
      const { ac_id } = req.params
      const {
        ac_name, ac_email, ac_phone, ac_password,
        en_job_title, en_location, en_job_type, en_desc
      } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(ac_password, salt)
      const data = {
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: encrypt
      }

      const result = await updateAccountModul(ac_id, req, data, 'Engineer', en_job_title, en_location, en_job_type, en_desc)
      console.log('result : ' + result)
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
      const {
        ac_name, ac_email, ac_password,
        cp_company, cp_position, cp_field, cp_location
      } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(ac_password, salt)
      const data = {
        ac_name: ac_name, ac_email: ac_email, ac_password: encrypt
      }

      const result = await updateAccountModul(ac_id, req, data, 'Company', cp_company, cp_position, cp_field, cp_location)
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
  },
  loginAccount: async (req, res) => {
    try {
      const { ac_email, ac_password } = req.body
      const getUserData = await checkExistedEmailModul(ac_email)
      console.log(getUserData)

      if (getUserData.length > 0) {
        const checkPassword = bcrypt.compareSync(ac_password, getUserData[0].ac_password)
        if (checkPassword) {
          const { ac_email, ac_password, ac_level } = getUserData[0]
          let payload = {
            ac_email,
            ac_password,
            ac_level
          }

          const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
          payload = { ...payload, token }
          res.status(200).send({
            success: true,
            message: 'Successfully Login!',
            data: payload
          })
        } else {
          res.status(200).send({
            success: true,
            message: 'Wrong Password!'
          })
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'Email/Account not registered!'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  }
}
