import { ZodError } from 'zod'
import { IErrorSource, IGenericErrorResponse } from '../interface/errors'

// handle zod Error
const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errorSources: IErrorSource[] = error?.issues?.map(issue => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleZodError
