/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { saveMacAddress } from '../../utils/token/token'
import { userServices } from './user.service'

// User signup
const signup = catchAsync(async (req, res, next) => {
  const createdUser = await userServices.createUserInToDB(req.body)

  if (!createdUser) {
    return sendResponse(res, {
      status: 'error',
      statusCode: 400,
      message: 'User not created',
      data: null,
    })
  }

  sendResponse(res, {
    status: 'success',
    statusCode: 201,
    message: 'User created successfully',
    data: createdUser,
  })
})

// User login
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const token = await userServices.loginUser(email, password)
  await saveMacAddress(req, next)

  if (!token) {
    return sendResponse(res, {
      status: 'error',
      statusCode: 401,
      message: 'User not logged in',
      data: null,
    })
  }

  // save cookie in user browser
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  }

  res.cookie('quizAppToken', token, cookieOptions)

  sendResponse(res, {
    status: 'success',
    statusCode: 200,
    message: 'User logged in successfully',
    data: token,
  })
})

// User logout
const logout = catchAsync(async (req, res, next) => {
  // remove cookie from user browser
  res.clearCookie('quizAppToken')

  return sendResponse(res, {
    status: 'success',
    statusCode: 200,
    message: 'User logged out successfully',
    data: null,
  })
})

// get a single user by email
const getUserByEmail = catchAsync(async (req, res, next) => {
  const user = await userServices.getUserByEmailFromDB(req.params.email)

  if (!user) {
    return sendResponse(res, {
      status: 'error',
      statusCode: 404,
      message: 'User not found',
      data: null,
    })
  }

  sendResponse(res, {
    status: 'success',
    statusCode: 200,
    message: 'User found successfully',
    data: user,
  })
})

export const userControllers = {
  login,
  signup,
  logout,
  getUserByEmail,
}
