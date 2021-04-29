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
router.get(
  '/search',
  authMiddleware.userAuthentication,
  movieController.searchNameMovieData
)
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
  authMiddleware.userAuthentication,
  premiereController.getAllPremiereLocation
)
router.get(
  '/admin/premiere-location/:id',
  authMiddleware.userAuthentication,
  premiereController.getOnePremiereLocation
)
router.post(
  '/admin/premiere-location',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  premiereController.createPremiereLocation
)
router.patch(
  '/admin/premiere-location/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  premiereController.updatePremiereLocation
)
router.delete(
  '/admin/premiere-location/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  premiereController.deletePremiereLocation
)

// Cinema
router.get(
  '/admin/cinema',
  authMiddleware.userAuthentication,
  cinemaController.getAllCinema
)
router.get(
  '/admin/cinema/:id',
  authMiddleware.userAuthentication,
  cinemaController.getOneCinema
)
router.post(
  '/admin/cinema',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  cinemaController.createCinemaData
)
router.patch(
  '/admin/cinema/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  cinemaController.updateCinemaData
)
router.delete(
  '/admin/cinema/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  cinemaController.deleteCinemaData
)

// Schedule
router.get(
  '/admin/schedule',
  authMiddleware.userAuthentication,
  scheduleController.getAllSchedule
)
router.get(
  '/admin/schedule/:id',
  authMiddleware.userAuthentication,
  scheduleController.getOneSchedule
)
router.post(
  '/admin/schedule',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  scheduleController.createSchedule
)
router.patch(
  '/admin/schedule/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  scheduleController.updateSchedule
)
router.delete(
  '/admin/schedule/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  scheduleController.deleteSchedule
)

// Booking
router.get(
  '/booking',
  authMiddleware.userAuthentication,
  bookingController.getBooking
)
router.post(
  '/booking',
  authMiddleware.userAuthentication,
  bookingController.createBooking
)

module.exports = router
