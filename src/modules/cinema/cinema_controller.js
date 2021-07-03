const helper = require('../../helpers/wrapper')
const cinemaModel = require('./cinema_model')
const scheduleModel = require('../schedule/schedule_model')

module.exports = {
  getAllCinema: async (req, res) => {
    try {
      const { id } = req.params
      let {
        scheduleDate = '',
        premiereLocation = '',
        movie = '',
        order = 'cinema_id ASC',
        page = '1',
        limit = '100'
      } = req.query

      let queryCondition
      if (premiereLocation && movie) {
        queryCondition = `premiere_location.premiere_location_city LIKE "%${premiereLocation}%" AND movie.movie_name LIKE "%${movie}%"`
      } else if (scheduleDate) {
        queryCondition = `schedule.schedule_date LIKE "%${scheduleDate}%"`
      } else if (premiereLocation) {
        queryCondition = `premiere_location.premiere_location_city LIKE "%${premiereLocation}%"`
      } else if (movie) {
        queryCondition = `movie.movie_name LIKE "%${movie}%"`
      } else {
        if (id) {
          queryCondition = `cinema.movie_id = ${id} AND cinema.cinema_name LIKE "%%"`
        } else {
          queryCondition = 'cinema.cinema_name LIKE "%%"'
        }
      }

      page = parseInt(page)
      limit = parseInt(limit)
      let offset = 0
      offset = page * limit - limit
      const totalData = await cinemaModel.getDataCount(queryCondition)
      const totalPage = Math.ceil(totalData / limit)
      const pageInfo = { page, totalPage, limit, totalData, offset }
      const result = await cinemaModel.getDataCinema(
        queryCondition,
        order,
        limit,
        offset
      )
      for (const cinema of result) {
        const fromSchedule = await scheduleModel.getDataCinemaById(
          cinema.cinema_id
        )
        cinema.schedule_clock = fromSchedule.map(
          (schedule) => schedule.schedule_clock
        )
      }
      return helper.response(
        res,
        200,
        'Success get all of data cinema',
        result,
        pageInfo
      )
    } catch (error) {
      console.log(error)
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
      const {
        movieId,
        premiereId,
        cinemaName,
        cinemaPrice,
        scheduleDateStart,
        scheduleDateEnd,
        scheduleDateClock = ['08:30:00', '10:00:00', '14:00:00', '18:00:00'],
        scheduleLocation
      } = req.body
      const setDataCinema = {
        movie_id: movieId,
        premiere_location_id: premiereId,
        cinema_name: cinemaName,
        cinema_price: cinemaPrice
      }
      const resultCinema = await cinemaModel.createDataCinema(setDataCinema)

      const newResultCinema = {
        ...resultCinema,
        schedule_date_start: scheduleDateStart,
        schedule_date_end: scheduleDateEnd,
        scheduleDateClock: scheduleDateClock,
        schedule_location: scheduleLocation
      }

      const cinemaId = resultCinema.id

      await scheduleDateClock.forEach((element) => {
        const setDataSchedule = {
          cinema_id: cinemaId,
          schedule_date_start: scheduleDateStart,
          schedule_date_end: scheduleDateEnd,
          schedule_clock: element,
          schedule_location: scheduleLocation
        }
        scheduleModel.createScheduleData(setDataSchedule)
      })

      return helper.response(
        res,
        200,
        'Cinema data is successfully created.',
        newResultCinema
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
