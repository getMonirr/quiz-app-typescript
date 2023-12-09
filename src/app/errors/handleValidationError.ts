import mongoose from 'mongoose'
import { IErrorSource, IGenericErrorResponse } from '../interface/errors'

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errorSources: IErrorSource[] = Object.values(error.errors).map(val => {
    return {
      path: val?.path,
      message: val?.message,
    }
  })

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleValidationError
