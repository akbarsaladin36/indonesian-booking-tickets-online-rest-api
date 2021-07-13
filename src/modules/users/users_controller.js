const fs = require('fs')
const helper = require('../../helpers/wrapper')
const userModel = require('./users_model')
const bcrypt = require('bcrypt')

module.exports = {
  getUserAccountById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.getOneUserData(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success get users by id', result)
      } else {
        return helper.response(
          res,
          404,
          'User data with id is not found.',
          null
        )
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  updateUserVerifiedAccount: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.updateUserData(
        { user_account_verified: 1 },
        id
      )
      return helper.response(res, 200, 'Success verified your account', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', null)
    }
  },

  updateUserAccount: async (req, res) => {
    try {
      const { id } = req.params
      const { userEmail, userFirstName, userLastName, userPhoneNumber } =
        req.body
      const setData = {
        user_account_email: userEmail,
        user_account_first_name: userFirstName,
        user_account_last_name: userLastName,
        user_account_phone_number: userPhoneNumber,
        updated_at: new Date(Date.now())
      }
      const result = await userModel.getOneUserData(id)
      if (result.length > 0) {
        const newResult = await userModel.updateUserData(setData, id)
        return helper.response(
          res,
          200,
          'Success updating a profile users',
          newResult
        )
      } else {
        return helper.response(
          res,
          400,
          'Your profile data is not updated. Please try again.'
        )
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  updateUserPassword: async (req, res) => {
    try {
      const { id } = req.params
      const { userNewPassword, userConfirmPassword } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userNewPassword, salt)
      const setData = {
        user_account_password: encryptPassword,
        updated_at: new Date(Date.now())
      }
      const result = await userModel.getOneUserData(id)
      if (result.length > 0) {
        if (userNewPassword !== userConfirmPassword) {
          return helper.response(
            res,
            400,
            'The password is not same like confirm password.',
            null
          )
        } else {
          const newResult = await userModel.updateUserData(setData, id)
          delete newResult.user_account_password
          return helper.response(
            res,
            200,
            'Success updating a password users',
            newResult
          )
        }
      } else {
        return helper.response(
          res,
          400,
          'The password is not updated. Please try again.',
          null
        )
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  updateUserImage: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        user_account_image: req.file ? req.file.filename : '',
        updated_at: new Date(Date.now())
      }
      const updateData = await userModel.getOneUserData(id)
      if (updateData.length > 0) {
        if (updateData.length > 0) {
          const imageDelete = updateData[0].user_account_image
          const imageExist = fs.existsSync(`src/uploads/${imageDelete}`)

          if (imageExist && imageDelete) {
            fs.unlink(`src/uploads/${imageDelete}`, (err) => {
              if (err) throw err
            })
          }
        }

        const result = await userModel.updateUserData(setData, id)
        return helper.response(
          res,
          200,
          `Success uploading an profile image with ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          403,
          `the user image with ${id} is not found. Please try again.`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  deleteUserAccount: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.getOneUserData(id)
      if (result.length > 0) {
        const newResult = await userModel.deleteOneUserData(id)
        return helper.response(
          res,
          200,
          'the user with id is deleted successfully',
          newResult
        )
      } else {
        return helper.response(res, 400, 'the user with id is not found.', null)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  deleteImage: async (req, res) => {
    try {
      const { id } = req.params
      const updateData = await userModel.getOneUserData(id)
      if (updateData.length > 0) {
        if (updateData.length > 0) {
          const imageDelete = updateData[0].user_account_image
          const imageExist = fs.existsSync(`src/uploads/${imageDelete}`)

          if (imageExist && imageDelete) {
            fs.unlink(`src/uploads/${imageDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const setData = {
          user_account_image: '',
          updated_at: new Date(Date.now())
        }
        const result = await userModel.updateUserData(setData, id)
        return helper.response(
          res,
          200,
          `Success deleting an profile image with ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          403,
          `the user image with ${id} is not found. Please try again.`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
