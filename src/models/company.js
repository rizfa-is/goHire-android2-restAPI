const db = require('../helpers/db')

module.exports = {
  getAllCompanyModel: (searchKey, searchValue, limit, offset, filter) => {
    return new Promise((resolve, reject) => {
      let query = ''
      switch (filter) {
        case 0:
          query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, company.cp_desc, company.cp_img, project.pj_name as project, company.cp_insta, company.cp_linkedin 
          FROM company 
          LEFT JOIN account ON account.ac_id = company.ac_id LEFT JOIN project ON project.cp_id = company.cp_id
          WHERE ${searchKey} LIKE '%${searchValue}%'
          ORDER BY company.cp_id 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 1:
          query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, company.cp_desc, company.cp_img, project.pj_name as project, company.cp_insta, company.cp_linkedin 
          FROM company 
          LEFT JOIN account ON account.ac_id = company.ac_id LEFT JOIN project ON project.cp_id = company.cp_id
          WHERE ${searchKey} LIKE '%${searchValue}%'
          ORDER BY account.ac_name 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 2:
          query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, company.cp_desc, company.cp_img, project.pj_name as project, company.cp_insta, company.cp_linkedin 
          FROM company 
          LEFT JOIN account ON account.ac_id = company.ac_id LEFT JOIN project ON project.cp_id = company.cp_id
          WHERE ${searchKey} LIKE '%${searchValue}%'
          ORDER BY company.cp_company
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 3:
          query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, company.cp_desc, company.cp_img, project.pj_name as project, company.cp_insta, company.cp_linkedin 
          FROM company 
          LEFT JOIN account ON account.ac_id = company.ac_id LEFT JOIN project ON project.cp_id = company.cp_id
          WHERE ${searchKey} LIKE '%${searchValue}%'
          ORDER BY company.cp_location 
          LIMIT ${limit} OFFSET ${offset}`
          break
        case 4:
          query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, company.cp_desc, company.cp_img, project.pj_name as project, company.cp_insta, company.cp_linkedin 
          FROM company  
          LEFT JOIN account ON account.ac_id = company.ac_id LEFT JOIN project ON project.cp_id = company.cp_id
          WHERE ${searchKey} LIKE '%${searchValue}%'
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
  getCompanyByIdModel: (cpId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT company.cp_id, account.ac_name, company.cp_company, company.cp_position, company.cp_field, company.cp_location, company.cp_desc, company.cp_img, project.pj_name as project, company.cp_insta, company.cp_linkedin 
      FROM company 
      LEFT JOIN account ON account.ac_id = company.ac_id LEFT JOIN project ON project.cp_id = company.cp_id  
      WHERE company.cp_id = ${cpId}`
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createCompanyModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO company SET ?'
      db.query(query, data, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteCompanyModel: (acId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM company 
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
  updateCompanyModel: (acId, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE company SET ?
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
