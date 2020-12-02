const db = require('../helpers/db')

module.exports = {
  getAllExperienceModel: (searchKey, searchValue, limit, offset) => {
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
  getExperienceByEnIdModel: (exId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM experience 
      WHERE en_id = ${exId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getExperienceByExIdModel: (exId) => {
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
  createExperienceModel: (data) => {
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
  deleteExperienceModel: (exId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM experience 
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
  updateExperienceModel: (exId, data) => {
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
