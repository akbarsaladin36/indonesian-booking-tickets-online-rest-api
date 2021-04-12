const connection = require('../../config/mysql')

module.exports = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM movie ORDER BY movie_name ASC, movie_release_date ASC',
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
  getDataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM movie',
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
  searchDataName: (searchResult, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM movie WHERE movie_name LIKE "%"?"%" LIMIT ? OFFSET ?',
        [searchResult, limit, offset],
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
