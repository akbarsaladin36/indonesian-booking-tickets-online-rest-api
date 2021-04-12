const express = require('express')
const router = express.Router()
const movieController = require('./movie_controller')
const premiereController = require('../premiere_location/premiere_controller')

// Movie Page Website

router.get('/home', movieController.getAllMovieData)
router.get('/movie-detail/:id', movieController.getOneMovieData)
router.get('/search', movieController.searchNameMovieData)
router.post('/home', movieController.createNewMovieData)
router.patch('/movie-detail/:id', movieController.updateOneMovieData)
router.delete('/movie-detail/:id', movieController.deleteOneMovieData)

// Creating a Premiere Location (Admin)

router.post('/admin', premiereController.createPremiereLocation)

module.exports = router
