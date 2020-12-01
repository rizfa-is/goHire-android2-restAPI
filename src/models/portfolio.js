const db = require('../helpers/db')

module.exports = {
  getAllPortfolioModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM portfolio 
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
  getPortfolioByIdModel: (prId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM portfolio 
      WHERE en_id = ${prId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createPortfolioModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO portfolio SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deletePortfolioModel: (prId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM portfolio 
      WHERE pr_id = ${prId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePortfolioModel: (prId, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE portfolio SET ?
      WHERE pr_id = ${prId}`
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
