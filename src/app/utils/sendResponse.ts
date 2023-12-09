import { Response } from 'express'

interface IPayload<T> {
  status: 'success' | 'error' | 'fail'
  statusCode: number
  message: string
  data: T
}

const sendResponse = <T>(res: Response, payload: IPayload<T>) => {
  return res.status(payload.statusCode).json({
    status: payload.status,
    message: payload.message,
    data: payload.data,
  })
}

export default sendResponse
