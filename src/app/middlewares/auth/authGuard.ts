import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { JwtDecode } from '../../interface/jwtDecode'
import sendResponse from '../../utils/sendResponse'

// authGuard
export const authGuard: RequestHandler = (req, res, next) => {
  // check authorization
  const authorization = req.headers.authorization
  if (!authorization) {
    return sendResponse(res, {
      status: 'error',
      statusCode: 401,
      message: 'Authorization failed',
      data: null,
    })
  }

  // verify token
  const token = authorization.split(' ')[1]

  jwt.verify(token, config.jwt_secret as string, (error, decode) => {
    if (error) {
      return sendResponse(res, {
        status: 'error',
        statusCode: 402,
        message: 'Authorization failed',
        data: null,
      })
    }

    // set data to body and go to next
    req.user = decode as JwtDecode
    next()
  })
}
