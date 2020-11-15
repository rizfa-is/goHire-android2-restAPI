const { createAbilityModul } = require('./ability')
const { createExperienceModul } = require('./experience')
const { createPortfolioModul } = require('./portfolio')

module.exports = {
  createEngineerModul: (db, data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO engineer SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          await createAbilityModul(db, { en_id: result.insertId })
          await createExperienceModul(db, { en_id: result.insertId })
          await createPortfolioModul(db, { en_id: result.insertId })
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
