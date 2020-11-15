const db = require('../helpers/db')
const { createHireModul } = require('../models/hire')

module.exports = {
  getAllProjectModul: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM project 
      WHERE ${searchKey} LIKE '%${searchValue}%' 
      LIMIT ${limit} OFFSET ${offset}`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProjectByIdModul: (pjId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM project 
      WHERE pj_id = ${pjId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createProjectModul: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO project SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  parsialUpdateProjectModul: (pjId, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE project SET ? WHERE pj_id = ${pjId}`, data, async (err, result, _fields) => {
        if (!err) {
          await createHireModul(db, { pj_id: pjId })
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
