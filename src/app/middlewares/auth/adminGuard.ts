import { RequestHandler } from 'express'
import User from '../../modules/user/user.model'
import sendResponse from '../../utils/sendResponse'

// adminGuard
export const adminGuard: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return sendResponse(res, {
      status: 'error',
      statusCode: 401,
      message: 'Authorization failed',
      data: null,
    })
  }

  const user = await User.findOne({ email: req.user.email })

  if (user?.role !== 'admin') {
    return sendResponse(res, {
      status: 'error',
      statusCode: 403,
      message: 'authorization failed',
      data: null,
    })
  }

  next()
}
