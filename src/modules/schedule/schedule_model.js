const connection = require('../../config/mysql')

module.exports = {
  getAllScheduleData: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM schedule INNER JOIN cinema ON schedule.cinema_id=cinema.cinema_id',
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
  getOneScheduleData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM schedule WHERE schedule_id=?',
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
  createScheduleData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO schedule SET ?',
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
          // console.log(result)
          // console.log(error)
        }
      )
    })
  },
  updateOneScheduleData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE schedule SET ? WHERE schedule_id=?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
          // console.log(result)
          // console.log(error)
        }
      )
    })
  },
  deleteOneScheduleData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM schedule WHERE schedule_id=?',
        id,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
          // console.log(result)
          // console.log(error)
        }
      )
    })
  }
}
