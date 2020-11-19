const db = require('../helpers/db')
const { createEngineerModul, updateEngineerModul, deleteEngineerModul } = require('./engineer')
const { createCompanyModul, updateCompanyModul, deleteCompanyModul } = require('./company')

module.exports = {
  // === Login Page ===
  // Register
  createAccountModul: (data, level, company, position) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO account SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          let newData = { }
          if (level === 'Engineer') {
            await createEngineerModul({ ac_id: result.insertId })
            newData = {
              id: result.insertId,
              ...data
            }
            delete newData.ac_password
          } else {
            await createCompanyModul({
              ac_id: result.insertId,
              cp_company: company,
              cp_position: position
            })
            newData = {
              id: result.insertId,
              ...data,
              cp_company: company,
              cp_position: position
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
  updateAccountModul: (acId, req, data, level, jobTitle, location, jobType, desc) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE account SET ?
      WHERE ac_id = ${acId}`
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          if (level === 'Engineer') {
            await updateEngineerModul(acId, {
              en_job_title: jobTitle,
              en_location: location,
              en_job_type: jobType,
              en_desc: desc,
              en_avatar: req.files === undefined ? '' : req.files.en_avatar[0].filename
            })
          } else {
            await updateCompanyModul(acId, {
              cp_company: jobTitle,
              cp_position: location,
              cp_field: jobType,
              cp_location: desc,
              cp_img: req.files === undefined ? '' : req.files.cp_img[0].filename
            })
          }
          resolve(result)
        } else {
          console.log(err)
          reject(new Error(err))
        }
      })
    })
  },
  deleteAccountModul: (acId, level) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM account 
      WHERE ac_id = ${acId}`
      db.query(query, async (err, result, _fields) => {
        if (!err) {
          if (level === 'Engineer') {
            await deleteEngineerModul(acId)
          } else {
            await deleteCompanyModul(acId)
          }
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  checkExistedEmailModul: (acEmail) => {
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
  }
}
