const helper = require('../../helpers/wrapper')
const scheduleModel = require('./schedule_model')
// const cinemaModel = require('../cinema/cinema_model')

module.exports = {
  getAllSchedule: async (req, res) => {
    try {
      const result = await scheduleModel.getAllScheduleData()
      return helper.response(res, 200, 'Success get all of schedule', result)
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  getOneSchedule: async (req, res) => {
    try {
      const { id } = req.params
      const result = await scheduleModel.getOneScheduleData(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Get a schedule data with id is success.',
          result
        )
      } else {
        return helper.response(res, 400, 'The data with id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  createSchedule: async (req, res) => {
    try {
      const {
        cinemaId,
        scheduleDate,
        scheduleClock,
        scheduleLocation
      } = req.body
      const setData = {
        cinema_id: cinemaId,
        schedule_date: scheduleDate,
        schedule_clock: scheduleClock,
        schedule_location: scheduleLocation
      }
      const result = await scheduleModel.createScheduleData(setData)
      return helper.response(
        res,
        200,
        'Schedule data is successfully created.',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params
      const {
        cinemaId,
        scheduleDate,
        scheduleClock,
        scheduleLocation
      } = req.body
      const setData = {
        cinema_id: cinemaId,
        schedule_date: scheduleDate,
        schedule_clock: scheduleClock,
        schedule_location: scheduleLocation
      }
      const result = await scheduleModel.getOneScheduleData(id)
      if (result.length > 0) {
        const newResult = await scheduleModel.updateOneScheduleData(setData, id)
        return helper.response(
          res,
          200,
          'The schedule data with id is successfully updated.',
          newResult
        )
      } else {
        return helper.response(res, 400, 'the data with id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      const { id } = req.params
      const result = await scheduleModel.getOneScheduleData(id)
      if (result.length > 0) {
        const newResult = await scheduleModel.deleteOneScheduleData(id)
        return helper.response(
          res,
          200,
          'The schedule data with id is successfully deleted.',
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
