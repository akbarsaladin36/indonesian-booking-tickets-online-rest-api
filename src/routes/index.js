const express = require('express')
const router = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const authRouter = require('../modules/auth/auth_routes')

router.use('/tickitz', movieRouter)
router.use('/auth', authRouter)

module.exports = router
