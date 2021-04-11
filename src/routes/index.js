const express = require('express')
const router = express.Router()
const movieRouter = require('../modules/movie/movie_routes')

router.use('/tickitz', movieRouter)

module.exports = router
