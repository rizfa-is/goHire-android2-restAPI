const db = require('../helpers/db')

module.exports = {
  getAllProjectModel: (searchKey, searchValue, limit, offset) => {
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
  getProjectByIdModel: (pjId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM project 
      WHERE cp_id = ${pjId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createProjectModel: (data) => {
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
  deleteProjectModel: (pjId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM project 
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
  updateProjectModel: (pjId, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE project SET ?
      WHERE pj_id = ${pjId}`
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
