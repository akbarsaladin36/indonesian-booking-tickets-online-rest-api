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
  createBooking: async (req, res) => {
    try {
      const {
        cinemaId,
        bookingTicket,
        bookingTotalPrice,
        bookingPaymentMethod,
        bookingStatus,
        bookingSeatLocation
      } = req.body
      const setData = {
        cinema_id: cinemaId,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        booking_payment_method: bookingPaymentMethod,
        booking_status: bookingStatus
      }
      const result = await bookingModel.createDataBooking(setData)
      console.log(result)

      bookingSeatLocation.forEach((element) => {
        const setBookingSeat = {
          booking_id: result.id,
          booking_seat_location: element
        }
        console.log(setBookingSeat)

        const result2 = bookingModel.createDataBookingSeat(setBookingSeat)
      })
      return helper.response(
        res,
        200,
        'Booking data is successfully created.',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
