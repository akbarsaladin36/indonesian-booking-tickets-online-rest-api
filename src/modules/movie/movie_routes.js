const express = require('express')
const router = express.Router()
const movieController = require('./movie_controller')
const premiereController = require('../premiere_location/premiere_controller')
const cinemaController = require('../cinema/cinema_controller')
const scheduleController = require('../schedule/schedule_controller')
const bookingController = require('../booking/booking_controller')
const authMiddleware = require('../../middleware/auth')
const uploadImage = require('../../middleware/upload')

// Movie Page Website
router.get(
  '/home',
  authMiddleware.userAuthentication,
  movieController.getAllMovieData
)
router.get(
  '/movie-detail/:id',
  authMiddleware.userAuthentication,
  movieController.getOneMovieData
)
router.get('/search', movieController.searchNameMovieData)
router.post(
  '/home',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  movieController.createNewMovieData
)
router.patch(
  '/movie-detail/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  movieController.updateOneMovieData
)
router.delete(
  '/movie-detail/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  movieController.deleteOneMovieData
)

// Premiere Location
router.get(
  '/admin/premiere-location',
  premiereController.getAllPremiereLocation
)
router.get(
  '/admin/premiere-location/:id',
  premiereController.getOnePremiereLocation
)
router.post(
  '/admin/premiere-location',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  premiereController.createPremiereLocation
)
router.patch(
  '/admin/premiere-location/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  premiereController.updatePremiereLocation
)
router.delete(
  '/admin/premiere-location/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  premiereController.deletePremiereLocation
)

// Cinema
router.get('/admin/cinema', cinemaController.getAllCinema)
router.get('/admin/cinema/:id', cinemaController.getOneCinema)
router.post('/admin/cinema', cinemaController.createCinemaData)
router.patch('/admin/cinema/:id', cinemaController.updateCinemaData)
router.delete('/admin/cinema/:id', cinemaController.deleteCinemaData)

// Schedule
router.get('/admin/schedule', scheduleController.getAllSchedule)
router.get('/admin/schedule/:id', scheduleController.getOneSchedule)
router.post('/admin/schedule', scheduleController.createSchedule)
router.patch('/admin/schedule/:id', scheduleController.updateSchedule)
router.delete('/admin/schedule/:id', scheduleController.deleteSchedule)

// Booking
router.get('/booking', bookingController.getBooking)
router.post('/booking', bookingController.createBooking)

module.exports = router
