const db = require('../helpers/db')

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
  deleteProjectModul: (pjId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM project 
      WHERE pj_id = ${pjId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          console.log(result)
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProjectModul: (pjId, data) => {
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
