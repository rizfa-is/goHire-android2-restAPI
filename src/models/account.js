const db = require('../helpers/db')
const { createEngineerModel, updateEngineerModel, deleteEngineerModel, getEngineerByIdModel } = require('./engineer')
const { createCompanyModel, updateCompanyModel, deleteCompanyModel, getCompanyByIdModel } = require('./company')
const { createAdminModel, updateAdminModel, deleteAdminModel, getAdminByIdModel } = require('./admin')
const moment = require('moment')
const now = moment().format('YYYY-MM-DD HH:mm:ss')

module.exports = {
  createAccountModel: (data, level, company, position) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO account SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          let newData = { }

          if (level === 'Engineer') {
            await createEngineerModel({
              ac_id: result.insertId,
              en_created_at: now,
              en_updated_at: now
            })
            newData = {
              id: result.insertId,
              ...data,
              en_created_at: now,
              en_updated_at: now
            }
            delete newData.ac_password
          } else if (level === 'Company') {
            await createCompanyModel({
              ac_id: result.insertId,
              cp_company: company,
              cp_position: position,
              cp_created_at: now,
              cp_updated_at: now
            })
            newData = {
              id: result.insertId,
              ...data,
              cp_company: company,
              cp_position: position,
              cp_created_at: now,
              cp_updated_at: now
            }
            delete newData.ac_password
          } else if (level === 'Admin') {
            await createAdminModel({
              ac_id: result.insertId,
              ad_created_at: now,
              ad_updated_at: now
            })
            newData = {
              id: result.insertId,
              ...data,
              ad_created_at: now,
              ad_updated_at: now
            }
            delete newData.ac_password
          }

          resolve(newData)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateAccountModel: (acId, req, data, level, dataAdv) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE account SET ?
      WHERE ac_id = ${acId}`
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          if (level === 'Engineer') {
            const getEng = await getEngineerByIdModel(acId)
            await updateEngineerModel(acId, {
              ...dataAdv,
              en_avatar: req.file === undefined ? getEng[0].en_avatar : req.file.filename,
              en_updated_at: now
            })
          } else if (level === 'Company') {
            const getCp = await getCompanyByIdModel(acId)
            await updateCompanyModel(acId, {
              ...dataAdv,
              cp_img: req.file === undefined ? getCp[0].cp_img : req.file.filename,
              cp_updated_at: now
            })
          } else if (level === 'Admin') {
            const getAd = await getAdminByIdModel(acId)
            await updateAdminModel(acId, {
              ...dataAdv,
              ad_avatar: req.file === undefined ? getAd[0].ad_avatar : req.file.filename,
              ad_updated_at: now
            })
          }

          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteAccountModel: (acId, level) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM account 
      WHERE ac_id = ${acId}`
      db.query(query, async (err, result, _fields) => {
        if (!err) {
          if (level === 'Engineer') {
            await deleteEngineerModel(acId)
          } else if (level === 'Company') {
            await deleteCompanyModel(acId)
          } else if (level === 'Admin') {
            await deleteAdminModel(acId)
          }
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  checkExistedEmailModel: (acEmail) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM account 
      WHERE ac_email = '${acEmail}'`
      db.query(query, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  checkAccountModel: (acId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM account 
      WHERE ac_id = '${acId}'`
      db.query(query, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
