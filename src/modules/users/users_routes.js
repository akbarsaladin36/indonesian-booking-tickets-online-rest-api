const express = require('express')
const router = express.Router()
const userController = require('./users_controller')
const authMiddleware = require('../../middleware/auth')
const uploadImage = require('../../middleware/upload')
const redisMiddleware = require('../../middleware/redis')

// Users

router.get('/user-activation/:id', userController.updateUserVerifiedAccount)

router.get(
  '/:id',
  authMiddleware.userAuthentication,
  userController.getUserAccountById
)
router.patch(
  '/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearMovieDataRedis,
  userController.updateUserAccount
)

router.patch(
  '/change-password/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearMovieDataRedis,
  userController.updateUserPassword
)

router.patch(
  '/img/:id',
  authMiddleware.userAuthentication,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
  userController.updateUserImage
)

router.patch(
  '/img-delete/:id',
  authMiddleware.userAuthentication,
  uploadImage,
  redisMiddleware.clearMovieDataRedis,
  userController.deleteImage
)

router.delete(
  '/:id',
  authMiddleware.userAuthentication,
  redisMiddleware.clearMovieDataRedis,
  userController.deleteUserAccount
)

module.exports = router
