const helper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')
// const cinemaModel = require('../cinema/cinema_model')

module.exports = {
  getBooking: async (req, res) => {
    try {
      const result = await bookingModel.getDataBooking()
      return helper.response(
        res,
        200,
        'Success get all of data booking',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  getBookingById: async (req, res) => {
    try {
      const { cinemaId, scheduleId } = req.query
      const result = await bookingModel.getDataBookingById(cinemaId, scheduleId)
      return helper.response(res, 200, 'Success Get a Booking data.', result)
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  createBooking: async (req, res) => {
    try {
      // console.log(req.body)
      const {
        userId,
        movieId,
        cinemaId,
        scheduleId,
        bookingTicket,
        bookingTotalPrice,
        bookingPaymentMethod,
        bookingStatus,
        bookingSeat
      } = req.body

      const setData = {
        user_account_id: userId,
        movie_id: movieId,
        cinema_id: cinemaId,
        schedule_id: scheduleId,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        booking_payment_method: bookingPaymentMethod,
        booking_status: bookingStatus
      }
      const result = await bookingModel.createDataBooking(setData)

      for (const element of bookingSeat) {
        const setBookingSeat = {
          booking_id: result.id,
          booking_seat_location: element
        }
        const result2 = bookingModel.createDataBookingSeat(setBookingSeat)
      }
      return helper.response(
        res,
        200,
        'Booking data is successfully created.',
        result
      )
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
