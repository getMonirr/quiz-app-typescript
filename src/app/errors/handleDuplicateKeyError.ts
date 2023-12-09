/* eslint-disable @typescript-eslint/no-explicit-any */

import { IErrorSource, IGenericErrorResponse } from '../interface/errors'

const handleDuplicateKeyError = (error: any): IGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = error?.message.match(/"([^"]*)"/)

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1]

  const errorSources: IErrorSource[] = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ]

  const statusCode = 400

  return {
    statusCode,
    message: 'Duplicate ID',
    errorSources,
  }
}

export default handleDuplicateKeyError
