const express = require('express')
const router = express.Router()
const dashboardController = require('./dashboard_controller')
const authMiddleware = require('../../middleware/auth')

// Dashboard
router.get(
  '/',
  authMiddleware.userAuthentication,
  authMiddleware.isAdmin,
  dashboardController.getDashboardEarningData
)

module.exports = router
