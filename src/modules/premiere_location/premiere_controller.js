const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')

module.exports = {
  getAllPremiereLocation: async (req, res) => {
    try {
      const result = await premiereModel.getDataPremiere()
      return helper.response(
        res,
        200,
        'Get all premiere location data is success',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  getOnePremiereLocation: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premiereModel.getDataPremiereById(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Get premiere location data from id is success',
          result
        )
      } else {
        return helper.response(res, 400, 'the data from id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'the data from id is not found.', null)
    }
  },
  createPremiereLocation: async (req, res) => {
    try {
      const { premiereLocationCity, premiereLocationAddress } = req.body
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
      const result = await premiereModel.getDataPremiereById(id)
      const { premiereLocationCity, premiereLocationAddress } = req.body
      const setData = {
        premiere_location_city: premiereLocationCity,
        premiere_location_address: premiereLocationAddress
      }
      if (result.length > 0) {
        const newResult = await premiereModel.updateDataPremiere(setData, id)
        return helper.response(
          res,
          200,
          'the data of premiere location with id is updated.',
          newResult
        )
      } else {
        return helper.response(res, 400, 'the data from id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  deletePremiereLocation: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premiereModel.getDataPremiereById(id)
      if (result.length > 0) {
        const newResult = await premiereModel.deleteDataPremiere(id)
        return helper.response(
          res,
          200,
          'the data with id is deleted.',
          newResult
        )
      } else {
        return helper.response(res, 400, 'the data with id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
