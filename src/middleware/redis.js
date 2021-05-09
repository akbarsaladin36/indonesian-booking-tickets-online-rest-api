const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {
  getAllMovieDataRedis: (req, res, next) => {
    client.get('getmovie:all', (error, result) => {
      if (!error && result != null) {
        console.log('data ada di dalam redis')
        const newResult = JSON.parse(result)
        console.log(newResult)
        return helper.response(
          res,
          200,
          'Success get All of Movie Data.',
          newResult
        )
      } else {
        console.log('data tidak ada di dalam redis.')
        next()
      }
    })
  },
  getOneMovieDataRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getmovie:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('Data ada di dalam redis')
        return helper.response(
          res,
          200,
          'Success get Data by id.',
          JSON.parse(result)
        )
      } else {
        console.log('Data tidak ada dalam redis')
        next()
      }
    })
  },
  clearMovieDataRedis: (req, res, next) => {
    client.keys('getmovie*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
