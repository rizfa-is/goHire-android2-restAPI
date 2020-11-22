const db = require('../helpers/db')

module.exports = {
  getAllHireModul: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM hire 
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
  getHireByIdModul: (hrId) => {
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
  createHireModul: (data) => {
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
  deleteHireModul: (hrId) => {
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
  updateHireModul: (hrId, data) => {
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
