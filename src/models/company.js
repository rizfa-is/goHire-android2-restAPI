const db = require('../helpers/db')
const { getProjectByCpIdModel } = require('./project')

module.exports = {
  getAllCompanyModel: (searchKey, searchValue, limit, offset, filter) => {
    return new Promise((resolve, reject) => {
      let order = ''
      switch (filter) {
        case 0:
          order = 'company.cp_id'
          break
        case 1:
          order = 'account.ac_name'
          break
        case 2:
          order = 'company.cp_company'
          break
        case 3:
          order = 'company.cp_location'
          break
        case 4:
          order = 'company.cp_position'
          break
      }

      const query = `SELECT 
      company.ac_id,
      company.cp_id, 
      account.ac_name, 
      account.ac_email,
      company.cp_company, 
      company.cp_position, 
      company.cp_field, 
      company.cp_location, 
      company.cp_desc, 
      company.cp_img, 
      project.pj_name as project, 
      company.cp_insta, 
      company.cp_linkedin 
      FROM company 
      LEFT JOIN account ON account.ac_id = company.ac_id 
      LEFT JOIN project ON project.cp_id = company.cp_id
      WHERE ${searchKey} LIKE '%${searchValue}%'
      GROUP BY company.cp_id
      ORDER BY ${order} 
      LIMIT ${limit} OFFSET ${offset}`

      db.query(query, async (err, result, fields) => {
        if (!err) {
          const newdb = []

          for (let i = 0; i < result.length; i++) {
            const item = result[i]

            const project = await getProjectByCpIdModel(item.cp_id)

            newdb[i] = {
              ac_id: item.ac_id,
              cp_id: item.cp_id,
              ac_name: item.ac_name,
              ac_email: item.ac_email,
              cp_company: item.cp_company,
              cp_position: item.cp_position,
              cp_field: item.cp_field,
              cp_location: item.cp_location,
              cp_desc: item.cp_desc,
              cp_insta: item.cp_insta,
              cp_linkedin: item.cp_linkedin,
              cp_img: item.cp_img,
              project: project
            }
          }
          resolve(newdb)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getCompanyByIdModel: (cpId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT 
      company.ac_id,
      company.cp_id, 
      account.ac_name,
      account.ac_email, 
      company.cp_company, 
      company.cp_position, 
      company.cp_field, 
      company.cp_location, 
      company.cp_desc, 
      company.cp_img, 
      project.pj_name as project, 
      company.cp_insta, 
      company.cp_linkedin 
      FROM company 
      LEFT JOIN account ON account.ac_id = company.ac_id 
      LEFT JOIN project ON project.cp_id = company.cp_id
      WHERE company.ac_id = ${cpId}
      GROUP BY company.cp_id`

      db.query(query, async (err, result, fields) => {
        if (!err) {
          const newdb = []

          for (let i = 0; i < result.length; i++) {
            const item = result[i]

            const project = await getProjectByCpIdModel(item.cp_id)

            newdb[i] = {
              ac_id: item.ac_id,
              cp_id: item.cp_id,
              ac_name: item.ac_name,
              ac_email: item.ac_email,
              cp_company: item.cp_company,
              cp_position: item.cp_position,
              cp_field: item.cp_field,
              cp_location: item.cp_location,
              cp_desc: item.cp_desc,
              cp_insta: item.cp_insta,
              cp_linkedin: item.cp_linkedin,
              cp_img: item.cp_img,
              project: project
            }
          }
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
