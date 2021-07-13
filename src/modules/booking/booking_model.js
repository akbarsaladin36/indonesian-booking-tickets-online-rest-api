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

  getDataBookingById: (cinemaId, scheduleId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT b.booking_id, b.cinema_id, b.schedule_id, bs.booking_seat_location FROM booking b JOIN booking_seat bs ON b.booking_id = bs.booking_id WHERE b.cinema_id = ? AND b.schedule_id = ? AND b.booking_status = ?',
        [cinemaId, scheduleId, 'Y'],
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
