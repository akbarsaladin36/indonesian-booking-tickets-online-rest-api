const connection = require('../../config/mysql')

module.exports = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM movie', (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getDataCount: (searchResult) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM movie WHERE movie_name LIKE '%${searchResult}%'`,
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

  getOneData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM movie WHERE movie_id=?',
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

  createNewData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO movie SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
        // console.log(error)
        // console.log(result)
      })
    })
  },
  updateOneData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE movie SET ? WHERE movie_id=?',
        [setData, id],
        (error, result) => {
          // console.log(error)
          // console.log(result)
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
  deleteOneData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM movie WHERE movie_id=?',
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
  },
  searchDataName: (searchResult, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM movie WHERE movie_name LIKE '%${searchResult}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [limit, offset],
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
  },
  getDataByMonth: (month, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM movie WHERE MONTH(movie_release_date)=? AND YEAR(movie_release_date) >= YEAR(NOW()) ORDER BY movie_release_date ASC LIMIT ?',
        [month, limit],
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
