// error sources interface
export interface IErrorSource {
  path: string | number
  message: string
}

// error return interface
export interface IGenericErrorResponse {
  statusCode: number
  message: string
  errorSources: IErrorSource[]
}
