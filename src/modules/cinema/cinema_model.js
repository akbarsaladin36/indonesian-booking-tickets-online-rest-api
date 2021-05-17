const connection = require('../../config/mysql')

module.exports = {
  getDataCinema: (condition, order, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM cinema JOIN premiere_location ON cinema.premiere_location_id=premiere_location.premiere_location_id JOIN movie ON cinema.movie_id=movie.movie_id WHERE ${condition} ORDER BY ${order} LIMIT ? OFFSET ?`,
        [limit, offset],
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
  getDataCinemaById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM cinema WHERE cinema_id=?',
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
  createDataCinema: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO cinema SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updateDataCinema: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE cinema SET ? WHERE cinema_id=?',
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
        }
      )
    })
  },
  deleteDataCinema: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM cinema WHERE cinema_id=?',
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
  getDataCount: (condition) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM cinema JOIN premiere_location ON cinema.premiere_location_id=premiere_location.premiere_location_id 
        JOIN movie ON cinema.movie_id=movie.movie_id
        WHERE ${condition}`,
        (error, result) => {
          if (!error) {
            resolve(result[0].total)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
