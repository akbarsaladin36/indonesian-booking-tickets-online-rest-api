const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../../helpers/wrapper')
const authModel = require('../auth/auth_model')
const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
  registerUserAccount: async (req, res) => {
    try {
      const {
        userEmail,
        userName,
        userFirstName,
        userLastName,
        userPassword,
        userPhoneNumber,
        userStatus
      } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      const setData = {
        user_account_email: userEmail,
        user_account_username: userName,
        user_account_first_name: userFirstName,
        user_account_last_name: userLastName,
        user_account_password: encryptPassword,
        user_account_phone_number: userPhoneNumber,
        user_account_status: userStatus,
        user_account_verified: 1
      }

      const checkEmailUser = await authModel.getUserData({
        user_account_email: userEmail
      })

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
      })

      const mailOptions = {
        from: '"Tickitz" <adminTickitz.gmail.com>',
        to: userEmail,
        subject: 'Tickitz- Activation Email',
        html: `<b>Click here to activate it.</b><a href=http://localhost:5000/api/v1/tickitz/user-activation/1}>Click!</>`
      }

      if (checkEmailUser.length > 0) {
        return helper.response(
          res,
          403,
          'Email is exist. Please try again.',
          null
        )
      } else {
        await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log(error)
            return helper.response(res, 400, 'Email not send !')
          } else {
            console.log('Email have been sent to:' + info.response)
            const result = await authModel.registerUser(setData)
            delete result.user_account_password
            return helper.response(
              res,
              200,
              'User is successfully created.',
              result
            )
          }
        })
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', null)
    }
  },
  loginUserAccount: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getUserData({
        user_account_email: userEmail
      })
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
  },
  getUserAccountById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await authModel.getOneUserData(id)
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
  updateUserAccount: async (req, res) => {
    try {
      const { id } = req.params
      const {
        userEmail,
        userName,
        userFirstName,
        userLastName,
        userNewPassword,
        userConfirmPassword,
        userPhoneNumber
      } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userNewPassword, salt)
      const setData = {
        user_account_email: userEmail,
        user_account_username: userName,
        user_account_first_name: userFirstName,
        user_account_last_name: userLastName,
        user_account_password: encryptPassword,
        user_account_phone_number: userPhoneNumber
      }
      const result = await authModel.getOneUserData(id)
      if (result.length > 0) {
        if (userNewPassword !== userConfirmPassword) {
          return helper.response(
            res,
            400,
            'The password is not same like confirm password.',
            null
          )
        } else {
          const newResult = await authModel.updateUserData(setData, id)
          return helper.response(
            res,
            200,
            'Success updating a profile users',
            newResult
          )
        }
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  deleteUserAccount: async (req, res) => {
    try {
      const { id } = req.params
      const result = await authModel.getOneUserData(id)
      if (result.length > 0) {
        const newResult = await authModel.deleteOneUserData(id)
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
  }
}
