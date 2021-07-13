const helper = require('../../helpers/wrapper')
const dashboardModel = require('./dashboard_model')

module.exports = {
  getDashboardEarningData: async (req, res) => {
    try {
      const { movieData, cinemaData, premiereLocationData } = req.query
      let queryCondition
      if (movieData && cinemaData && premiereLocationData) {
        queryCondition = `WHERE movie_id=${movieData} AND cinema_id=${cinemaData} AND premiere_location_id=${premiereLocationData}`
      } else if (movieData && cinemaData) {
        queryCondition = `WHERE movie_id=${movieData} AND cinema_id=${cinemaData}`
      } else if (cinemaData && premiereLocationData) {
        queryCondition = `WHERE cinema_id=${cinemaData} AND premiere_location_id=${premiereLocationData}`
      } else if (movieData && premiereLocationData) {
        queryCondition = `WHERE movie_id=${movieData} AND premiere_location_id=${premiereLocationData}`
      } else if (movieData) {
        queryCondition = `WHERE movie_id=${movieData}`
      } else if (cinemaData) {
        queryCondition = `WHERE cinema_id=${cinemaData}`
      } else if (premiereLocationData) {
        queryCondition = `WHERE premiere_location_id=${premiereLocationData}`
      } else {
        queryCondition = ''
      }

      const result = await dashboardModel.getEarningData(queryCondition)
      if (
        movieData === '' &&
        cinemaData === '' &&
        premiereLocationData === ''
      ) {
        return helper.response(
          res,
          400,
          'Choose the movie, cinema, premiere location to get result!',
          null
        )
      }
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Success get a earning result in dashboard',
          result
        )
      } else if (result.length === 0) {
        return helper.response(res, 400, 'The earning data is not found', null)
      } else {
        return helper.response(
          res,
          400,
          'Something wrong when get earning data. Please try again.',
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
