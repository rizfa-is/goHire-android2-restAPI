module.exports = {
  createExperienceModul: (db, data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO experience SET ?'
      db.query(query, data, async (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
