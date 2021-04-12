const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')

module.exports = {
  createPremiereLocation: async (req, res) => {
    try {
      const {
        premiereLocationCity,
        premiereLocationAddress
      } = req.body
      const setData = {
        premiere_location_city: premiereLocationCity,
        premiere_location_address: premiereLocationAddress
      }
      const result = await premiereModel.createDataPremiere(setData)
      return helper.response(
        res,
        200,
        'New premiere location is successfully created.',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  updatePremiereLocation: async (req, res) => {
    try {
      const { id } = req.params
      const {
        premiereLocationCity,
        premiereLocationAddress
      } = req.body
      const setData = {
        premiere_location_city: premiereLocationCity,
        premiere_location_address: premiereLocationAddress
      }
      const result = await premiereModel.updateDataPremiere(setData, id)
      return helper.response(
        res,
        200,
        'the data of premiere location with id is updated.',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  deletePremiereLocation: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premiereModel.deleteDataPremiere(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'the data with id is deleted.', result)
      } else {
        return helper.response(res, 400, 'the data with id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
