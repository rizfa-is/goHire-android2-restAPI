const db = require('../helpers/db')

module.exports = {
  getAllExperienceModul: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM experience 
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
  getExperienceByIdModul: (exId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM experience 
      WHERE ex_id = ${exId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createExperienceModul: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO experience SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteExperienceModul: (exId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM experience 
      WHERE ex_id = ${exId}`
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
  updateExperienceModul: (exId, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE experience SET ?
      WHERE ex_id = ${exId}`
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
