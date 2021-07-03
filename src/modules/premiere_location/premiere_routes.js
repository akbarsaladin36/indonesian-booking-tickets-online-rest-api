const express = require('express')
const router = express.Router()
const premiereController = require('./premiere_controller')
const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redis')

// Premiere Location
router.get(
  '/',
  authMiddleware.userAuthentication,
  premiereController.getAllPremiereLocation
)
router.get(
  '/:id',
  authMiddleware.userAuthentication,
  premiereController.getOnePremiereLocation
)
router.post(
  '/admin',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
  premiereController.createPremiereLocation
)
router.patch(
  '/admin/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
  premiereController.updatePremiereLocation
)
router.delete(
  '/admin/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
  premiereController.deletePremiereLocation
)

module.exports = router
