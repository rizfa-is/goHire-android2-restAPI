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
  // === Home Page & Engineer List Page===
  getAllEngineerModul: (searchKey, searchValue, limit, offset, filter) => {
    return new Promise((resolve, reject) => {
      let query = ''
      switch (filter) {
        case 0:
          query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, COUNT(ability.en_id) AS skill, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
          FROM account 
          LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id 
          WHERE ${searchKey} LIKE '%${searchValue}%'
          GROUP BY engineer.en_id 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 1:
          query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, COUNT(ability.en_id) AS skill, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
          FROM account 
          LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id 
          WHERE ${searchKey} LIKE '%${searchValue}%'
          GROUP BY engineer.en_id 
          ORDER BY account.ac_name 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 2:
          query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, COUNT(ability.en_id) AS skill, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
          FROM account 
          LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id 
          WHERE ${searchKey} LIKE '%${searchValue}%'
          GROUP BY engineer.en_id
          ORDER BY skill DESC 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 3:
          query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, COUNT(ability.en_id) AS skill, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
          FROM account 
          LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id 
          WHERE ${searchKey} LIKE '%${searchValue}%'
          GROUP BY engineer.en_id 
          ORDER BY engineer.en_location 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 4:
          query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, COUNT(ability.en_id) AS skill, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
          FROM account 
          LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id 
          WHERE ${searchKey} LIKE '%${searchValue}%'
          GROUP BY engineer.en_id 
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
  getAllAbilityModul: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM ability ORDER BY en_id'
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAbilityByIdModul: (enId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ability WHERE en_id = ${enId} ORDER BY ability.ab_id`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  // === Engineer Detail Page===
  getEngineerByIdModul: (enId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT engineer.en_id, account.ac_name, engineer.en_job_title, engineer.en_location, engineer.en_job_type, engineer.en_desc, COUNT(ability.en_id) AS skill, account.ac_email, engineer.en_ig, engineer.en_github, engineer.en_gitlab, engineer.en_avatar 
      FROM account 
      LEFT JOIN engineer ON account.ac_id = engineer.ac_id LEFT JOIN ability ON engineer.en_id = ability.en_id  
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
  getAllPortfolioModul: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM portfolio ORDER BY en_id'
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getPortfolioByIdModul: (enId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM portfolio
      WHERE en_id = ${enId}`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAllExperienceModul: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM experience'
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getExperienceByIdModul: (enId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM experience
      WHERE en_id = ${enId}`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  // Company Detail Page
  getAllCompanyModul: (searchKey, searchValue, limit, offset, filter) => {
    return new Promise((resolve, reject) => {
      let query = ''
      switch (filter) {
        case 0:
          query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, account.ac_email, company.cp_insta, company.cp_linkedin, company.cp_img
          FROM account 
          INNER JOIN company ON account.ac_id = company.ac_id 
          WHERE ${searchKey} LIKE '%${searchValue}%'
          GROUP BY company.cp_id 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 1:
          query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, account.ac_email, company.cp_insta, company.cp_linkedin, company.cp_img
          FROM account 
          INNER JOIN company ON account.ac_id = company.ac_id 
          WHERE ${searchKey} LIKE '%${searchValue}%'
          GROUP BY company.cp_id 
          ORDER BY account.ac_name 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 2:
          query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, account.ac_email, company.cp_insta, company.cp_linkedin, company.cp_img
          FROM account 
          INNER JOIN company ON account.ac_id = company.ac_id 
          WHERE ${searchKey} LIKE '%${searchValue}%'
          GROUP BY company.cp_id 
          ORDER BY company.cp_company
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 3:
          query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, account.ac_email, company.cp_insta, company.cp_linkedin, company.cp_img
          FROM account 
          INNER JOIN company ON account.ac_id = company.ac_id 
          WHERE ${searchKey} LIKE '%${searchValue}%'
          GROUP BY company.cp_id  
          ORDER BY company.cp_location 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 4:
          query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, account.ac_email, company.cp_insta, company.cp_linkedin, company.cp_img
          FROM account 
          INNER JOIN company ON account.ac_id = company.ac_id 
          WHERE ${searchKey} LIKE '%${searchValue}%'
          GROUP BY company.cp_id  
          ORDER BY company.cp_position 
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
  getCompanyByIdModul: (enId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, account.ac_email, company.cp_insta, company.cp_linkedin, company.cp_img
      FROM account 
      INNER JOIN company ON account.ac_id = company.ac_id  
      WHERE company.cp_id = ${enId}`
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
