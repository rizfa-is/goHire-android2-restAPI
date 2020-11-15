module.exports = {
  createAbilityModul: (db, data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO ability SET ?'
      db.query(query, data, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
