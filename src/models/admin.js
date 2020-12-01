const db = require('../helpers/db')

module.exports = {
  getAdminByIdModel: (adId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT admin.ad_id, account.ac_name, admin.ad_job_title, admin.ad_location, admin.ad_avatar, admin.ad_created_at, admin.ad_updated_at
      FROM admin 
      LEFT JOIN account ON account.ac_id = admin.ac_id
      WHERE company.cp_id = ${adId}`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createAdminModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO admin SET ?'
      db.query(query, data, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteAdminModel: (adId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM admin 
          WHERE ac_id = ${adId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateAdminModel: (adId, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE admin SET ?
          WHERE ad_id = ${adId}`
      db.query(query, data, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
