const express = require('express')
const router = express.Router()
const scheduleController = require('./schedule_controller')
const authMiddleware = require('../../middleware/auth')
// const uploadImage = require('../../middleware/upload')
const redisMiddleware = require('../../middleware/redis')

// Schedule
router.get(
  '/',
  authMiddleware.userAuthentication,
  scheduleController.getAllSchedule
)
router.get(
  '/:id',
  authMiddleware.userAuthentication,
  scheduleController.getOneSchedule
)
router.post(
  '/admin',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
  scheduleController.createSchedule
)
router.patch(
  '/admin/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
  scheduleController.updateSchedule
)
router.delete(
  '/admin/:id',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearMovieDataRedis,
  scheduleController.deleteSchedule
)

module.exports = router
