const db = require('../helpers/db')
const { createEngineerModul } = require('../moduls/engineer')
const { createCompanyModul } = require('../moduls/company')

module.exports = {
  // === Login Page ===
  // Register
  createWorkerAccountModul: (data, level, company, position) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO account SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          if (level === 'Engineer') {
            await createEngineerModul(db, { ac_id: result.insertId })
          } else {
            await createCompanyModul(db, {
              ac_id: result.insertId,
              cp_company: company,
              cp_position: position
            })
          }
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAllEngineer: (searchKey, searchValue, limit, offset, filter) => {
    return new Promise((resolve, reject) => {
      let query = ''
      switch (filter) {
        case 0:
          query = `SELECT account.ac_name, engineer.en_location, engineer.en_job_type, ability.en_id AS skill, engineer.en_avatar 
          FROM account 
          LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id 
          WHERE ${searchKey} LIKE '%${searchValue}%' 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 1:
          query = `SELECT account.ac_name, engineer.en_location, engineer.en_job_type, ability.en_id AS skill, engineer.en_avatar  
          FROM account 
          LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id 
          WHERE ${searchKey} LIKE '%${searchValue}%' 
          ORDER BY account.ac_name 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 2:
          query = `SELECT account.ac_name, engineer.en_location, engineer.en_job_type, COUNT(ability.en_id) AS skill, engineer.en_avatar  
          FROM account 
          LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id 
          WHERE ${searchKey} LIKE '%${searchValue}%' 
          GROUP BY account.ac_name
          ORDER BY skill DESC 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 3:
          query = `SELECT account.ac_name, engineer.en_location, engineer.en_job_type, ability.en_id AS skill, engineer.en_avatar  
          FROM account 
          LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id 
          WHERE ${searchKey} LIKE '%${searchValue}%' 
          ORDER BY engineer.en_location LIMIT ${limit} OFFSET ${offset}`
          break
        case 4:
          query = `SELECT account.ac_name, engineer.en_location, engineer.en_job_type, ability.en_id AS skill, engineer.en_avatar  
          FROM account 
          LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id 
          WHERE ${searchKey} LIKE '%${searchValue}%' 
          ORDER BY engineer.en_job_type LIMIT ${limit} OFFSET ${offset}`
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
  getAllAbilityModul: (enId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ability WHERE en_id = ${enId}`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAllModul: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM account INNER JOIN engineer ON account.ac_id = engineer.ac_id INNER JOIN company ON account.ac_id = company.ac_id'
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
