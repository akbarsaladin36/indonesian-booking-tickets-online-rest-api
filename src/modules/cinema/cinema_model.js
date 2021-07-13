const connection = require('../../config/mysql')

module.exports = {
  getDataCinema: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM cinema JOIN premiere_location ON cinema.premiere_location_id = premiere_location.premiere_location_id',
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

  getDataCinemaByMovieId: (id, location, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT c.cinema_id, l.premiere_location_id, c.cinema_name, c.cinema_price, l.premiere_location_city, l.premiere_location_address FROM cinema c JOIN premiere_location l ON c.premiere_location_id = l.premiere_location_id WHERE c.movie_id = ? AND l.premiere_location_city LIKE ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [id, location, limit, offset],
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

  getDataScheduleByCinemaId: (id, date) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT cinema_id, schedule_id, schedule_date, schedule_clock FROM schedule WHERE cinema_id = ? AND schedule_date LIKE ?',
        [id, date],
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

  getDataCinemaCount: (id, location, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM cinema c JOIN premiere_location l ON c.premiere_location_id = l.premiere_location_id WHERE c.movie_id = ? AND l.premiere_location_city LIKE ? ORDER BY ${sort}`,
        [id, location],
        (error, result) => {
          if (!error) {
            resolve(result[0].total)
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
  }
}
