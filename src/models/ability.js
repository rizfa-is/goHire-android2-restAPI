const db = require('../helpers/db')

module.exports = {
  getAllAbilityModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ability 
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
  getAbilityByEnIdModel: (abId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ability WHERE en_id = ${abId} ORDER BY ability.en_id`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAbilityByAbIdModel: (abId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ability WHERE ab_id = ${abId} ORDER BY ability.en_id`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createAbilityModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO ability SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteAbilityModel: (abId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM ability 
      WHERE ab_id = ${abId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateAbilityModel: (abId, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE ability SET ?
      WHERE ab_id = ${abId}`
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
