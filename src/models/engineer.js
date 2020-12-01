const db = require('../helpers/db')

module.exports = {
  getAllEngineerModel: (searchKey, searchValue, limit, offset, filter) => {
    return new Promise((resolve, reject) => {
      let query = ''
      switch (filter) {
        case 0:
          query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, ability.ab_name as skill, portfolio.pr_application as portfolio, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
          FROM engineer 
          LEFT JOIN account ON account.ac_id = engineer.ac_id LEFT JOIN ability ON ability.en_id = engineer.en_id LEFT JOIN portfolio ON portfolio.en_id = engineer.en_id
          WHERE ${searchKey} LIKE '%${searchValue}%' 
          ORDER BY engineer.en_id
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 1:
          query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, ability.ab_name as skill, portfolio.pr_application as portfolio, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
          FROM engineer 
          LEFT JOIN account ON account.ac_id = engineer.ac_id LEFT JOIN ability ON ability.en_id = engineer.en_id LEFT JOIN portfolio ON portfolio.en_id = engineer.en_id
          WHERE ${searchKey} LIKE '%${searchValue}%' 
          ORDER BY account.ac_name 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 2:
          query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, ability.ab_name as skill, portfolio.pr_application as portfolio, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
          FROM engineer 
          LEFT JOIN account ON account.ac_id = engineer.ac_id LEFT JOIN ability ON ability.en_id = engineer.en_id LEFT JOIN portfolio ON portfolio.en_id = engineer.en_id
          WHERE ${searchKey} LIKE '%${searchValue}%'  
          ORDER BY skill DESC 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 3:
          query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, ability.ab_name as skill, portfolio.pr_application as portfolio, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
          FROM engineer 
          LEFT JOIN account ON account.ac_id = engineer.ac_id LEFT JOIN ability ON ability.en_id = engineer.en_id LEFT JOIN portfolio ON portfolio.en_id = engineer.en_id
          WHERE ${searchKey} LIKE '%${searchValue}%' 
          ORDER BY engineer.en_location 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 4:
          query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, ability.ab_name as skill, portfolio.pr_application as portfolio, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
          FROM engineer 
          LEFT JOIN account ON account.ac_id = engineer.ac_id LEFT JOIN ability ON ability.en_id = engineer.en_id LEFT JOIN portfolio ON portfolio.en_id = engineer.en_id
          WHERE ${searchKey} LIKE '%${searchValue}%' 
          ORDER BY engineer.en_job_type 
          LIMIT ${limit} OFFSET ${offset}`
          break
      }
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getEngineerByIdModel: (enId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, ability.ab_name as skill, portfolio.pr_application as portfolio, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
      FROM engineer 
      LEFT JOIN account ON account.ac_id = engineer.ac_id LEFT JOIN ability ON ability.en_id = engineer.en_id LEFT JOIN portfolio ON portfolio.en_id = engineer.en_id
      WHERE engineer.en_id = ${enId}`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createEngineerModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO engineer SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteEngineerModel: (acId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM engineer 
      WHERE ac_id = ${acId}`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateEngineerModel: (acId, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE engineer SET ?
      WHERE ac_id = ${acId}`
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
