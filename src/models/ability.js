const db = require('../helpers/db')

module.exports = {
  getAllAbilityModul: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM ability ORDER BY ab_id'
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAbilityByIdModul: (abId) => {
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
  createAbilityModul: (data) => {
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
  deleteAbilityModul: (abId) => {
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
  updateAbilityModul: (abId, data) => {
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
