const express = require('express')
const router = express.Router()
const cinemaController = require('./cinema_controller')
const authMiddleware = require('../../middleware/auth')
const uploadImage = require('../../middleware/upload')
const redisMiddleware = require('../../middleware/redis')

// Cinema
router.get(
  '/',
  authMiddleware.userAuthentication,
  cinemaController.getAllCinema
)
router.get(
  '/:id',
  authMiddleware.userAuthentication,
  cinemaController.getOneCinema
)
router.post(
  '/admin',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
  cinemaController.createCinemaData
)
router.patch(
  '/admin/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
  cinemaController.updateCinemaData
)
router.delete(
  '/admin/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
  cinemaController.deleteCinemaData
)

module.exports = router
