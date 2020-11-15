module.exports = {
  createPortfolioModul: (db, data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO portfolio SET ?'
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

