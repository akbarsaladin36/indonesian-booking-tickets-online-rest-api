const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')
const fs = require('fs')
// const premiereModel = require('../premiere_location/premiere_model')

module.exports = {
  getAllMovieData: async (req, res) => {
    try {
      const result = await movieModel.getAllData()
      client.set('getmovie:all', JSON.stringify(result))
      return helper.response(res, 200, 'Success get all of data', result)
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  getOneMovieData: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getOneData(id)
      if (result.length > 0) {
        client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          'Success get one data of movie.',
          result
        )
      } else {
        return helper.response(res, 400, 'the data is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  createNewMovieData: async (req, res) => {
    try {
      // console.log(req.body)
      const {
        movieName,
        movieGenre,
        movieDuration,
        movieDirectedBy,
        movieCasts,
        movieReleaseDate,
        movieSynopsis
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_genre: movieGenre,
        movie_duration: movieDuration,
        movie_directed_by: movieDirectedBy,
        movie_casts: movieCasts,
        movie_image: req.file ? req.file.filename : '',
        movie_release_date: movieReleaseDate,
        movie_synopsis: movieSynopsis
      }
      const result = await movieModel.createNewData(setData)
      return helper.response(
        res,
        200,
        'A new movie is created successfully.',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  updateOneMovieData: async (req, res) => {
    try {
      const { id } = req.params
      const {
        movieName,
        movieGenre,
        movieDuration,
        movieDirectedBy,
        movieCasts,
        movieReleaseDate,
        movieSynopsis
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_genre: movieGenre,
        movie_duration: movieDuration,
        movie_directed_by: movieDirectedBy,
        movie_casts: movieCasts,
        movie_release_date: movieReleaseDate,
        movie_synopsis: movieSynopsis
      }
      const result = await movieModel.getOneData(id)
      if (result.length > 0) {
        const newResult = await movieModel.updateOneData(setData, id)
        return helper.response(
          res,
          200,
          'The data with id is successfuly updated.',
          newResult
        )
      } else {
        return helper.response(res, 404, 'the data with id is not found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', null)
    }
  },

  updateMovieImage: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        movie_image: req.file ? req.file.filename : '',
        updated_at: new Date(Date.now())
      }
      const updateData = await movieModel.getOneData(id)
      if (updateData.length > 0) {
        if (updateData.length > 0) {
          const imageDelete = updateData[0].movie_image
          const imageExist = fs.existsSync(`src/uploads/${imageDelete}`)

          if (imageExist && imageDelete) {
            fs.unlink(`src/uploads/${imageDelete}`, (err) => {
              if (err) throw err
            })
          }
        }

        const result = await movieModel.updateOneData(setData, id)
        return helper.response(
          res,
          200,
          `Success uploading an movie image with ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          403,
          `the user image with ${id} is not found. Please try again.`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  deleteOneMovieData: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getOneData(id)
      if (result.length > 0) {
        const deleteImage = result[0].movie_image
        const checkIfImageExist = fs.existsSync(`src/uploads/${deleteImage}`)
        if (checkIfImageExist && deleteImage) {
          fs.unlink(`src/uploads/${deleteImage}`, async function (err) {
            if (err) {
              return helper.response(
                res,
                401,
                'the image cannot deleted.',
                null
              )
            } else {
              // console.log('Gambar sudah terhapus.')
              const newResult = await movieModel.deleteOneData(id)
              return helper.response(
                res,
                200,
                'the data with id is deleted.',
                newResult
              )
            }
          })
        } else {
          return helper.response(
            res,
            401,
            'the result of data is not found',
            null
          )
        }
      } else {
        return helper.response(res, 400, 'the data with id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  searchMovieData: async (req, res) => {
    try {
      let { searchResult, sort, page, limit } = req.query

      searchResult = searchResult ? searchResult : ''
      sort = sort ? sort : 'movie_id DESC'
      page = page ? parseInt(page) : 1
      limit = limit ? parseInt(limit) : 5

      const totalData = await movieModel.getDataCount(searchResult)
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await movieModel.searchDataName(
        searchResult,
        sort,
        limit,
        offset
      )

      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `The result of this words is: ${searchResult}`,
          result,
          pageInfo
        )
      } else if (result.length === 0) {
        return helper.response(res, 400, 'the search data is no result.', null)
      } else {
        return helper.response(
          res,
          400,
          'Something wrong about searching a result. Please try again.',
          null
        )
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  getUpcomingMovieDataByMonth: async (req, res) => {
    try {
      let { month, limit } = req.params
      limit = !limit ? 1000 : parseInt(limit)
      const result = await movieModel.getDataByMonth(month, limit)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Success get a upcoming movies data',
          result
        )
      } else if (result.length === 0) {
        return helper.response(
          res,
          200,
          'There is no upcoming data for this month',
          []
        )
      } else {
        return helper.response(
          res,
          400,
          'getting data for upcoming movie is failed. Please try again.',
          null
        )
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
