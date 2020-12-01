require('dotenv')
const bcrypt = require('bcrypt')
const { createAccountModel, updateAccountModel, deleteAccountModel, checkExistedEmailModel } = require('../models/account')
const { successRegisterHandling, errorRegisterHandling, errorInternalHandling, successLoginHandling, passwordLoginHandling, emailLoginHandling, methodErrorHandling, failDeleteHandling, successDeleteHandling, successUpdateHandling, failUpdateHandling } = require('../helpers/respons-handling')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const now = moment().format('YYYY-MM-DD HH:mm:ss')
const scopeEn = 'engineer'
const scopeCp = 'company'
const scopeAd = 'admin'

module.exports = {
  createEngineerAccount: async (req, res) => {
    try {
      const { name, email, phone, password } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(password, salt)

      const data = {
        ac_name: name, ac_email: email, ac_phone: phone, ac_password: encrypt, ac_level: 'Engineer', ac_created_at: now, ac_updated_at: now
      }

      const checkEmail = await checkExistedEmailModel(email)
      if (checkEmail.length > 0) {
        errorRegisterHandling(res)
      } else {
        const result = await createAccountModel(data, 'Engineer')
        successRegisterHandling(res, result)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  createCompanyAccount: async (req, res) => {
    try {
      const { name, email, phone, password, company, position } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(password, salt)

      const data = {
        ac_name: name, ac_email: email, ac_phone: phone, ac_password: encrypt, ac_level: 'Company', ac_created_at: now, ac_updated_at: now
      }

      const checkEmail = await checkExistedEmailModel(email)
      if (checkEmail.length > 0) {
        errorRegisterHandling(res)
      } else {
        const result = await createAccountModel(data, 'Company', company, position)
        successRegisterHandling(res, result)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  createAdminAccount: async (req, res) => {
    try {
      const { name, email, phone, password } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(password, salt)

      const data = {
        ac_name: name, ac_email: email, ac_phone: phone, ac_password: encrypt, ac_level: 'Admin', ac_created_at: now, ac_updated_at: now
      }

      const checkEmail = await checkExistedEmailModel(email)
      if (checkEmail.length > 0) {
        errorRegisterHandling(res)
      } else {
        const result = await createAccountModel(data, 'Admin')
        successRegisterHandling(res, result)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  updateEngineerAccount: async (req, res) => {
    try {
      const { acId } = req.params
      const { name, email, phone, password, jobTitle, location, jobType, desc } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(password, salt)

      const data = {
        ac_name: name, ac_email: email, ac_phone: phone, ac_password: encrypt, ac_updated_at: now
      }
      const dataAdv = {
        en_job_title: jobTitle, en_location: location, en_job_type: jobType, en_desc: desc
      }

      const result = await updateAccountModel(acId, req, data, 'Engineer', dataAdv)
      if (result.affectedRows) {
        successUpdateHandling(res, acId, scopeEn)
      } else {
        failUpdateHandling(res, scopeEn, acId)
      }
    } catch (error) {
      methodErrorHandling(res, scopeEn)
    }
  },
  updateCompanyAccount: async (req, res) => {
    try {
      const { acId } = req.params
      const { name, email, phone, password, company, position, field, location } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(password, salt)

      const data = {
        ac_name: name, ac_email: email, ac_phone: phone, ac_password: encrypt, ac_updated_at: now
      }
      const dataAdv = {
        cp_company: company, cp_position: position, cp_field: field, cp_location: location
      }

      const result = await updateAccountModel(acId, req, data, 'Company', dataAdv)
      if (result.affectedRows) {
        successUpdateHandling(res, acId, scopeCp)
      } else {
        failUpdateHandling(res, scopeCp, acId)
      }
    } catch (error) {
      methodErrorHandling(res, scopeCp)
    }
  },
  updateAdminAccount: async (req, res) => {
    try {
      const { acId } = req.params
      const { name, email, phone, password, jobTitle, location } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypt = bcrypt.hashSync(password, salt)

      const data = {
        ac_name: name, ac_email: email, ac_phone: phone, ac_password: encrypt, ac_updated_at: now
      }
      const dataAdv = {
        ad_job_title: jobTitle, ad_location: location
      }

      const result = await updateAccountModel(acId, req, data, 'Admin', dataAdv)
      if (result.affectedRows) {
        successUpdateHandling(res, acId, scopeAd)
      } else {
        failUpdateHandling(res, scopeAd, acId)
      }
    } catch (error) {
      methodErrorHandling(res, scopeAd)
    }
  },
  deleteEngineerAccount: async (req, res) => {
    try {
      const { acId } = req.params
      const result = await deleteAccountModel(acId, 'Engineer')
      if (result.affectedRows) {
        successDeleteHandling(res, acId, scopeEn)
      } else {
        failDeleteHandling(res, scopeEn, acId)
      }
    } catch (error) {
      methodErrorHandling(res, scopeEn)
    }
  },
  deleteCompanyAccount: async (req, res) => {
    try {
      const { acId } = req.params
      const result = await deleteAccountModel(acId, 'Company')
      if (result.affectedRows) {
        successDeleteHandling(res, acId, scopeCp)
      } else {
        failDeleteHandling(res, scopeCp, acId)
      }
    } catch (error) {
      methodErrorHandling(res, scopeCp)
    }
  },
  deleteAdminAccount: async (req, res) => {
    try {
      const { acId } = req.params
      const result = await deleteAccountModel(acId, 'Admin')
      if (result.affectedRows) {
        successDeleteHandling(res, acId, scopeAd)
      } else {
        failDeleteHandling(res, scopeAd, acId)
      }
    } catch (error) {
      methodErrorHandling(res, scopeAd)
    }
  },
  loginAccount: async (req, res) => {
    try {
      const { email, password } = req.body
      const getUserData = await checkExistedEmailModel(email)

      if (getUserData.length > 0) {
        const checkPassword = bcrypt.compareSync(password, getUserData[0].ac_password)
        if (checkPassword) {
          const email = getUserData[0].ac_email
          const password = getUserData[0].ac_password
          const level = getUserData[0].ac_level
          let payload = {
            email,
            password,
            level
          }

          const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
          payload = { ...payload, token }
          delete payload.password
          successLoginHandling(res, payload)
        } else {
          passwordLoginHandling(res)
        }
      } else {
        emailLoginHandling(res)
      }
    } catch (error) {
      console.log(error)
      errorInternalHandling(res)
    }
  }
}
