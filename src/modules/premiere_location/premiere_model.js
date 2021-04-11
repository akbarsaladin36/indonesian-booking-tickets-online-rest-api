const connection = require('../../config/mysql')

module.exports = {
  getDataPremiere: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM premiere_location', (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getDataPremiereById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM premiere_location WHERE premiere_location_id=?',
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
  createDataPremiere: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO premiere_location SET ?',
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
  updateDataPremiere: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE premiere_location SET ? WHERE premiere_location_id=?',
        [setData, id],
        (error, result) => {
          console.log(result)
          console.log(error)
        }
      )
    })
  },
  deleteDataPremiere: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM premiere_location WHERE premiere_location_id=?',
        id,
        (error, result) => {
          console.log(result)
          console.log(error)
        }
      )
    })
  }
}
