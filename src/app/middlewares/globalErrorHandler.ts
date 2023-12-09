/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express'
import AppError from '../errors/AppError'
import handleCastError from '../errors/handleCastError'
import handleDuplicateKeyError from '../errors/handleDuplicateKeyError'
import handleValidationError from '../errors/handleValidationError'
import handleZodError from '../errors/handleZodError'
import { IErrorSource } from '../interface/errors'

const simplifyError = (err: any) => {
  // set default values
  let statusCode = 400
  let message = 'Something went wrong'
  let errorSources: IErrorSource[] = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  // handle zod validation error
  if (err?.name === 'ZodError') {
    return handleZodError(err)
  }

  // handle mongoose validation error
  if (err?.name === 'ValidationError') {
    return handleValidationError(err)
  }

  // handle mongoose cast error
  if (err?.name === 'CastError') {
    return handleCastError(err)
  }

  // handle mongoose duplicate key error
  if (err?.code === 11000) {
    return handleDuplicateKeyError(err)
  }

  // handle AppError
  if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  // handle other errors
  if (err instanceof Error) {
    message = err?.message
  }

  return { statusCode, message, errorSources }
}

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode, message, errorSources } = simplifyError(err)

  // send response
  res.status(statusCode).json({
    status: 'error',
    message,
    errorSources,
    err,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export default globalErrorHandler
