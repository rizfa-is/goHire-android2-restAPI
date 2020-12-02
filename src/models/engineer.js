const db = require('../helpers/db')
const { getAbilityByEnIdModel } = require('./ability')
const { getPortfolioByEnIdModel } = require('./portfolio')
const { getExperienceByEnIdModel } = require('./experience')

module.exports = {
  getAllEngineerModel: (searchKey, searchValue, limit, offset, filter) => {
    return new Promise((resolve, reject) => {
      let order = ''
      switch (filter) {
        case 0:
          order = 'engineer.ac_id'
          break
        case 1:
          order = 'account.ac_name'
          break
        case 2:
          order = 'skill DESC'
          break
        case 3:
          order = 'engineer.en_location'
          break
        case 4:
          order = 'engineer.en_job_type'
          break
      }

      const query = `SELECT 
      engineer.en_id, 
      account.ac_name, 
      engineer.en_job_title, 
      engineer.en_location, 
      engineer.en_job_type, 
      engineer.en_desc, 
      ability.ab_name as skill, 
      portfolio.pr_application as portfolio, 
      account.ac_email, 
      engineer.en_ig, 
      engineer.en_github, 
      engineer.en_gitlab, 
      engineer.en_avatar 
      FROM engineer 
      LEFT JOIN account ON account.ac_id = engineer.ac_id 
      LEFT JOIN ability ON ability.en_id = engineer.en_id 
      LEFT JOIN portfolio ON portfolio.en_id = engineer.en_id
      WHERE ${searchKey} LIKE '%${searchValue}%'
      GROUP BY engineer.en_id
      ORDER BY ${order}
      LIMIT ${limit} OFFSET ${offset}`

      db.query(query, async (err, result, fields) => {
        if (!err) {
          const newdb = []

          for (let i = 0; i < result.length; i++) {
            const item = result[i]

            const skill = await getAbilityByEnIdModel(item.en_id)
            const portfolio = await getPortfolioByEnIdModel(item.en_id)
            const experience = await getExperienceByEnIdModel(item.en_id)

            newdb[i] = {
              en_id: item.en_id,
              ac_name: item.ac_name,
              en_job_title: item.en_job_title,
              en_job_type: item.en_job_type,
              en_location: item.en_location,
              en_desc: item.en_desc,
              ac_email: item.ac_email,
              en_ig: item.en_ig,
              en_github: item.en_github,
              en_gitlab: item.en_gitlab,
              en_avatar: item.en_avatar,
              ability: skill,
              portfolio: portfolio,
              experience: experience
            }
          }
          resolve(newdb)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getEngineerByIdModel: (enId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT 
      engineer.en_id, 
      account.ac_name, 
      engineer.en_job_title, 
      engineer.en_location, 
      engineer.en_job_type, 
      engineer.en_desc, 
      ability.ab_name as skill, 
      portfolio.pr_application as portfolio, 
      account.ac_email, 
      engineer.en_ig, 
      engineer.en_github, 
      engineer.en_gitlab, 
      engineer.en_avatar 
      FROM engineer 
      LEFT JOIN account ON account.ac_id = engineer.ac_id 
      LEFT JOIN ability ON ability.en_id = engineer.en_id 
      LEFT JOIN portfolio ON portfolio.en_id = engineer.en_id
      WHERE engineer.ac_id = ${enId}
      GROUP BY engineer.en_id`
      db.query(query, async (err, result, fields) => {
        if (!err) {
          const newdb = []

          for (let i = 0; i < result.length; i++) {
            const item = result[i]

            const skill = await getAbilityByEnIdModel(item.en_id)
            const portfolio = await getPortfolioByEnIdModel(item.en_id)
            const experience = await getExperienceByEnIdModel(item.en_id)

            newdb[i] = {
              en_id: item.en_id,
              ac_name: item.ac_name,
              en_job_title: item.en_job_title,
              en_job_type: item.en_job_type,
              en_location: item.en_location,
              en_desc: item.en_desc,
              ac_email: item.ac_email,
              en_ig: item.en_ig,
              en_github: item.en_github,
              en_gitlab: item.en_gitlab,
              en_avatar: item.en_avatar,
              ability: skill,
              portfolio: portfolio,
              experience: experience
            }
          }
          resolve(newdb)
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
