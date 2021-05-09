const connection = require('../../config/mysql')

module.exports = {
  getEarningData: (whereCondition) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT MONTH(created_at) AS month, SUM(booking_total_price) AS total FROM booking ${whereCondition} GROUP BY MONTH(created_at)`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
