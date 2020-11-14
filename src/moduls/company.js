module.exports = {
  createCompanyModul: (db, data) => {
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
  }
}
