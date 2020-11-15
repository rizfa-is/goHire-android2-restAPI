module.exports = {
  createHireModul: (db, data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO hire SET ?'
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

