const express = require('express')
const router = express.Router()
const bookingController = require('./booking_controller')
const authMiddleware = require('../../middleware/auth')

// Booking
router.get('/', authMiddleware.userAuthentication, bookingController.getBooking)
router.get(
  '/get-booking',
  authMiddleware.userAuthentication,
  bookingController.getBookingById
)
router.post(
  '/',
  authMiddleware.userAuthentication,
  bookingController.createBooking
)

module.exports = router
