const express = require('express')
const router = express.Router()
const movieController = require('./movie_controller')
const premiereController = require('../premiere_location/premiere_controller')
const cinemaController = require('../cinema/cinema_controller')
const scheduleController = require('../schedule/schedule_controller')
const bookingController = require('../booking/booking_controller')
const authMiddleware = require('../../middleware/auth')
const uploadImage = require('../../middleware/upload')
const redisMiddleware = require('../../middleware/redis')
const userController = require('../auth/auth_controller')
const dashboardController = require('../dashboard/dashboard_controller')

// Users

router.get('/user-activation/:id', userController.updateUserVerifiedAccount)

router.get(
  '/profile/:id',
  authMiddleware.userAuthentication,
  userController.getUserAccountById
)
router.patch(
  '/profile/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearMovieDataRedis,
  userController.updateUserAccount
)

router.patch(
  '/profile/change-password/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearMovieDataRedis,
  userController.updateUserPassword
)

router.delete(
  '/profile/id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearMovieDataRedis,
  userController.deleteUserAccount
)

// Movie Page Website
router.get(
  '/home',
  authMiddleware.userAuthentication,
  redisMiddleware.getAllMovieDataRedis,
  movieController.getAllMovieData
)
router.get(
  '/movie-detail/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.getOneMovieDataRedis,
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
  redisMiddleware.clearMovieDataRedis,
  movieController.createNewMovieData
)
router.patch(
  '/movie-detail/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
  movieController.updateOneMovieData
)
router.delete(
  '/movie-detail/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
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
  redisMiddleware.clearMovieDataRedis,
  premiereController.createPremiereLocation
)
router.patch(
  '/admin/premiere-location/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
  premiereController.updatePremiereLocation
)
router.delete(
  '/admin/premiere-location/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
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
  redisMiddleware.clearMovieDataRedis,
  cinemaController.createCinemaData
)
router.patch(
  '/admin/cinema/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
  cinemaController.updateCinemaData
)
router.delete(
  '/admin/cinema/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
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
  redisMiddleware.clearMovieDataRedis,
  scheduleController.createSchedule
)
router.patch(
  '/admin/schedule/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
  scheduleController.updateSchedule
)
router.delete(
  '/admin/schedule/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
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

// Dashboard

router.get(
  '/dashboard',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  dashboardController.getDashboardEarningData
)

module.exports = router
