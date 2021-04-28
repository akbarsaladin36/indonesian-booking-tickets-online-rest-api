const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../../helpers/wrapper')
const authModel = require('../auth/auth_model')

module.exports = {
  registerUserAccount: async (req, res) => {
    try {
      // console.log(req.body)
      const { userEmail, userName, userPassword, userStatus } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      const setData = {
        user_account_email: userEmail,
        user_account_username: userName,
        user_account_password: encryptPassword,
        user_account_status: userStatus
      }
      const checkEmailUser = await authModel.getUserData({
        user_account_email: userEmail
      })
      if (checkEmailUser.length > 0) {
        return helper.response(
          res,
          403,
          'Email is exist. Please try again.',
          null
        )
      } else {
        const result = await authModel.registerUser(setData)
        delete result.user_account_password
        return helper.response(
          res,
          200,
          'User is successfully created.',
          result
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', null)
    }
  },
  loginUserAccount: async (req, res) => {
    try {
      // console.log(req.body)
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getUserData({
        user_account_email: userEmail
      })
      // console.log(checkEmailUser)
      if (checkEmailUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_account_password
        )
        if (checkPassword) {
          const payload = checkEmailUser[0]
          delete payload.user_account_password
          const token = jwt.sign({ ...payload }, 'AKBARSALADIN1995', {
            expiresIn: '24h'
          })
          const result = { ...payload, token }
          return helper.response(
            res,
            200,
            'User is successfully logged in to website',
            result
          )
        } else {
          return helper.response(
            res,
            404,
            'Password is incorrect. please try again.',
            null
          )
        }
      } else {
        return helper.response(
          res,
          400,
          'Email is incorrect. Please try again.',
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', null)
    }
  }
}
