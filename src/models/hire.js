const db = require('../helpers/db')

module.exports = {
  getAllHireModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT
      hire.hr_id,
      project.cp_id,
      hire.en_id,
      hire.pj_id,
      project.pj_name,
      project.pj_desc,
      project.pj_deadline,
      project.pj_img,
      hire.hr_price,
      hire.hr_message,
      hire.hr_status,
      hire.hr_date_confirm,
      hire.hr_created_at
      FROM hire
      LEFT JOIN project ON project.pj_id = hire.pj_id
      WHERE ${searchKey} LIKE '%${searchValue}%' 
      LIMIT ${limit} OFFSET ${offset}`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          console.log(err)
          reject(new Error(err))
        }
      })
    })
  },
  getHireByIdModel: (hrId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM hire 
      WHERE hr_id = ${hrId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createHireModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO hire SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteHireModel: (hrId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM hire 
      WHERE hr_id = ${hrId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateHireModel: (hrId, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE hire SET ?
      WHERE hr_id = ${hrId}`
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
