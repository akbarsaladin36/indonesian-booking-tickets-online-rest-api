const helper = require('../../helpers/wrapper')
const cinemaModel = require('./cinema_model')

module.exports = {
  getAllCinema: async (req, res) => {
    try {
      const result = await cinemaModel.getDataCinema()
      return helper.response(res, 200, 'Get All Cinema Data.', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  getCinemaByMovieId: async (req, res) => {
    try {
      let { movieId, location, date, sort, limit, page } = req.query

      location = location || '%%'
      date = date || '%%'
      sort = sort || 'c.cinema_name ASC'
      limit = limit || '6'
      page = page || '1'

      page = parseInt(page)
      limit = parseInt(limit)
      const offset = page * limit - limit
      const totalData = await cinemaModel.getDataCinemaCount(
        movieId,
        location,
        sort
      )
      const totalPage = Math.ceil(totalData / limit)
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await cinemaModel.getDataCinemaByMovieId(
        movieId,
        location,
        sort,
        limit,
        offset
      )
      for (const s of result) {
        s.schedule = await cinemaModel.getDataScheduleByCinemaId(
          s.cinema_id,
          date
        )
      }
      return helper.response(
        res,
        200,
        `Success get Cinema By Movie Id ${movieId}`,
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  getOneCinema: async (req, res) => {
    try {
      const { id } = req.params
      const result = await cinemaModel.getDataCinemaById(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Get a cinema data with id is success.',
          result
        )
      } else {
        return helper.response(res, 400, 'The data with id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  createCinemaData: async (req, res) => {
    try {
      const { movieId, premiereId, cinemaName, cinemaPrice } = req.body
      const setDataCinema = {
        movie_id: movieId,
        premiere_location_id: premiereId,
        cinema_name: cinemaName,
        cinema_price: cinemaPrice
      }
      const resultCinema = await cinemaModel.createDataCinema(setDataCinema)

      return helper.response(
        res,
        200,
        'Cinema data is successfully created.',
        resultCinema
      )
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  updateCinemaData: async (req, res) => {
    try {
      const { id } = req.params
      const { movieId, premiereId, cinemaName, cinemaPrice } = req.body
      const setData = {
        movie_id: movieId,
        premiere_location_id: premiereId,
        cinema_name: cinemaName,
        cinema_price: cinemaPrice,
        updated_at: new Date(Date.now())
      }
      const result = await cinemaModel.getDataCinemaById(id)
      if (result.length > 0) {
        const newResult = await cinemaModel.updateDataCinema(setData, id)
        return helper.response(
          res,
          200,
          'The cinema data with id is successfully updated.',
          newResult
        )
      } else {
        return helper.response(res, 400, 'the data with id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  deleteCinemaData: async (req, res) => {
    try {
      const { id } = req.params
      const result = await cinemaModel.getDataCinemaById(id)
      if (result.length > 0) {
        const newResult = await cinemaModel.deleteDataCinema(id)
        return helper.response(
          res,
          200,
          'The data with id is successfully deleted.',
          newResult
        )
      } else {
        return helper.response(res, 400, 'The data with id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
