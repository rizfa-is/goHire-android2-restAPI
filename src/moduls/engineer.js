module.exports = {
  createEngineerModul: (db, data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO engineer SET ?'
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
