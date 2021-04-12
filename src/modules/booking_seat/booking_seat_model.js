const connection = require('../../config/mysql')

module.exports = {
  getDataBookingSeat: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM booking_seat', (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getDataBookingSeatById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM booking_seat WHERE booking_seat_id=?',
        id,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  createDataBookingSeat: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking_seat SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
