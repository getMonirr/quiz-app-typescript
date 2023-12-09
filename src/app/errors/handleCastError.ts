import mongoose from 'mongoose'
import { IErrorSource, IGenericErrorResponse } from '../interface/errors'

const handleCastError = (
  error: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errorSources: IErrorSource[] = [
    {
      path: error?.path,
      message: error?.message,
    },
  ]

  const statusCode = 400

  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  }
}

export default handleCastError
