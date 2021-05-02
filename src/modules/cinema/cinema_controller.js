const helper = require('../../helpers/wrapper')
const cinemaModel = require('./cinema_model')

module.exports = {
  getAllCinema: async (req, res) => {
    try {
      const result = await cinemaModel.getDataCinema()
      return helper.response(res, 200, 'Success get all of data cinema', result)
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
      const setData = {
        movie_id: movieId,
        premiere_location_id: premiereId,
        cinema_name: cinemaName,
        cinema_price: cinemaPrice
      }
      const result = await cinemaModel.createDataCinema(setData)
      return helper.response(
        res,
        200,
        'Cinema data is successfully created.',
        result
      )
    } catch (error) {
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
        cinema_price: cinemaPrice
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
