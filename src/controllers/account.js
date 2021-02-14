require('dotenv')
const bcrypt = require('bcrypt')
const { createAccountModel, updateAccountModel, deleteAccountModel, checkExistedEmailModel, checkAccountModel } = require('../models/account')
const { successRegisterHandling, errorRegisterHandling, errorInternalHandling, successLoginHandling, passwordLoginHandling, emailLoginHandling, methodErrorHandling, failDeleteHandling, successDeleteHandling, successUpdateHandling, failUpdateHandling, successCheckEmail, successCheckPassword } = require('../helpers/respons-handling')
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
      const salt = bcrypt.genSaltSync(10)

      const getAc = await checkAccountModel(acId)
      const data = {
        ...req.body
      }
      data.ac_password = req.body.ac_password === undefined ? getAc[0].ac_password : bcrypt.hashSync(req.body.ac_password, salt)
      delete data.en_desc
      delete data.en_job_title
      delete data.en_location
      delete data.en_job_type
      delete data.en_ig
      delete data.en_github
      delete data.en_gitlab

      const dataAdv = {
        ...req.body
      }
      delete dataAdv.ac_name
      delete dataAdv.ac_email
      delete dataAdv.ac_phone
      delete dataAdv.ac_password

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
      const salt = bcrypt.genSaltSync(10)

      const getAc = await checkAccountModel(acId)
      const data = {
        ...req.body
      }
      data.ac_password = req.body.ac_password === undefined ? getAc[0].ac_password : bcrypt.hashSync(req.body.ac_password, salt)
      delete data.cp_company
      delete data.cp_position
      delete data.cp_field
      delete data.cp_location
      delete data.cp_desc
      delete data.cp_insta
      delete data.cp_linkedin

      const dataAdv = {
        ...req.body
      }
      delete dataAdv.ac_name
      delete dataAdv.ac_email
      delete dataAdv.ac_password
      delete dataAdv.ac_phone

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
      const salt = bcrypt.genSaltSync(10)

      const getAc = await checkAccountModel(acId)
      const data = {
        ...req.body
      }
      data.ac_password = req.body.ac_password === undefined ? getAc[0].ac_password : bcrypt.hashSync(req.body.ac_password, salt)
      delete data.ad_job_title
      delete data.ad_location

      const dataAdv = {
        ...req.body
      }
      delete dataAdv.ac_name
      delete dataAdv.ac_email
      delete dataAdv.ac_phone
      delete dataAdv.ac_password

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
          const acID = getUserData[0].ac_id
          const email = getUserData[0].ac_email
          const password = getUserData[0].ac_password
          const level = getUserData[0].ac_level
          let payload = {
            acID,
            email,
            password,
            level
          }

          const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '12h' })
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
      errorInternalHandling(res)
    }
  },
  checkEmail: async (req, res) => {
    try {
      const email = req.body.email
      const checkEmail = await checkExistedEmailModel(email)

      if (checkEmail.length > 0) {
        successCheckEmail(res)
      } else {
        emailLoginHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  checkPassword: async (req, res) => {
    try {
      const { email, password } = req.body
      const getUserData = await checkExistedEmailModel(email)

      if (getUserData.length > 0) {
        const checkPassword = bcrypt.compareSync(password, getUserData[0].ac_password)

        if (checkPassword) {
          successCheckPassword(res)
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
