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
          if (level === 'Engineer') {
            await createEngineerModul({ ac_id: result.insertId })
          } else {
            await createCompanyModul({
              ac_id: result.insertId,
              cp_company: company,
              cp_position: position
            })
          }
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateAccountModul: (acId, data, level, jobTitle, location, jobType, desc, avatar) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE account SET ?
      WHERE ac_id = ${acId}`
      console.log(data)
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          if (level === 'Engineer') {
            await updateEngineerModul(acId, { en_job_title: jobTitle, en_location: location, en_job_type: jobType, en_desc: desc, en_avatar: avatar })
          } else {
            await updateCompanyModul(acId, { cp_company: jobTitle, cp_position: location, cp_field: jobType, cp_location: desc, cp_img: avatar })
          }
          resolve(result)
        } else {
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
  }
}
