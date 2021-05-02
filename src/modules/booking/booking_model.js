const connection = require('../../config/mysql')

module.exports = {
  getDataBooking: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM booking INNER JOIN booking_seat ON booking.booking_id=booking_seat.booking_id',
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
  createDataBooking: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking SET ?',
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
  },
  createDataBookingSeat: (setBookingSeat) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking_seat SET ?',
        setBookingSeat,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setBookingSeat
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
