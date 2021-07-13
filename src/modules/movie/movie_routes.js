const express = require('express')
const router = express.Router()
const movieController = require('./movie_controller')
const authMiddleware = require('../../middleware/auth')
const uploadImage = require('../../middleware/upload')
const redisMiddleware = require('../../middleware/redis')

// Movie Page Website
router.get(
  '/',
  authMiddleware.userAuthentication,
  redisMiddleware.getAllMovieDataRedis,
  movieController.getAllMovieData
)
router.get(
  '/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.getOneMovieDataRedis,
  movieController.getOneMovieData
)

router.get(
  '/search-movie/search',
  authMiddleware.userAuthentication,
  movieController.searchMovieData
)

router.get(
  '/upcoming-movie/:month',
  authMiddleware.userAuthentication,
  movieController.getUpcomingMovieDataByMonth
)

router.post(
  '/admin',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
  movieController.createNewMovieData
)
router.patch(
  '/admin/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
  movieController.updateOneMovieData
)

router.patch(
  '/admin/img/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
  movieController.updateMovieImage
)

router.delete(
  '/admin/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
  movieController.deleteOneMovieData
)

module.exports = router
