const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')
// const premiereModel = require('../premiere_location/premiere_model')

module.exports = {
  getAllMovieData: async (req, res) => {
    try {
      const result = await movieModel.getAllData()
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
      console.log(req.body)
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
        movie_synopsis: movieSynopsis,
        updated_at: new Date(Date.now())
      }
      const result = await movieModel.updateOneData(setData, id)
      return helper.response(
        res,
        200,
        'The data with id is successfuly updated.',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  deleteOneMovieData: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.deleteOneData(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'the data with id is deleted.', result)
      } else {
        return helper.response(res, 400, 'the data with id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  searchNameMovieData: async (req, res) => {
    try {
      // console.log(req.query)
      const { searchResult, page, limit } = req.query
      const page1 = parseInt(page)
      const limit1 = parseInt(limit)
      const totalData = await movieModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit1)
      const offset = page1 * limit1 - limit1
      const pageInfo = {
        page1,
        totalPage,
        limit1,
        totalData
      }
      const result = await movieModel.searchDataName(
        searchResult,
        limit1,
        offset
      )
      return helper.response(
        res,
        200,
        'The result of this words is:',
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
