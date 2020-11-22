require('dotenv')
const bcrypt = require('bcrypt')
const { createAccountModul, updateAccountModul, deleteAccountModul, checkExistedEmailModul } = require('../models/account')
const { successRegisterHandling, errorRegisterHandling, errorInternalHandling, successLoginHandling, passwordLoginHandling, emailLoginHandling, methodErrorHandling, failDeleteHandling, successDeleteHandling, successUpdateHandling, failUpdateHandling } = require('../helpers/respons-handling')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const now = moment().format('YYYY-MM-DD HH:mm:ss')
const scopeEn = 'engineer'
const scopeCp = 'company'

module.exports = {
  createEngineerAccount: async (req, res) => {
    try {
      const { ac_name, ac_email, ac_phone, ac_password } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(ac_password, salt)

      const data = {
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: encrypt, ac_level: 'Engineer', ac_created_at: now, ac_updated_at: now
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
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: encrypt, ac_level: 'Company', ac_created_at: now, ac_updated_at: now
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
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: encrypt, ac_updated_at: now
      }

      const result = await updateAccountModul(ac_id, req, data, 'Engineer', en_job_title, en_location, en_job_type, en_desc)
      if (result.affectedRows) {
        successUpdateHandling(res, ac_id, scopeEn)
      } else {
        failUpdateHandling(res, scopeEn, ac_id)
      }
    } catch (error) {
      methodErrorHandling(res, scopeEn)
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
        ac_name: ac_name, ac_email: ac_email, ac_password: encrypt, ac_updated_at: now
      }

      const result = await updateAccountModul(ac_id, req, data, 'Company', cp_company, cp_position, cp_field, cp_location)
      if (result.affectedRows) {
        successUpdateHandling(res, ac_id, scopeCp)
      } else {
        failUpdateHandling(res, scopeCp, ac_id)
      }
    } catch (error) {
      methodErrorHandling(res, scopeCp)
    }
  },
  deleteEngineerAccount: async (req, res) => {
    try {
      const { ac_id } = req.params
      const result = await deleteAccountModul(ac_id, 'Engineer')
      if (result.affectedRows) {
        successDeleteHandling(res, ac_id, scopeEn)
      } else {
        failDeleteHandling(res, scopeEn, ac_id)
      }
    } catch (error) {
      methodErrorHandling(res, scopeEn)
    }
  },
  deleteCompanyAccount: async (req, res) => {
    try {
      const { ac_id } = req.params
      const result = await deleteAccountModul(ac_id, 'Company')
      if (result.affectedRows) {
        successDeleteHandling(res, ac_id, scopeCp)
      } else {
        failDeleteHandling(res, scopeCp, ac_id)
      }
    } catch (error) {
      methodErrorHandling(res, scopeCp)
    }
  },
  loginAccount: async (req, res) => {
    try {
      const { ac_email, ac_password } = req.body
      const getUserData = await checkExistedEmailModul(ac_email)

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
          successLoginHandling(res, payload)
        } else {
          passwordLoginHandling(res)
        }
      } else {
        emailLoginHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  }
}
