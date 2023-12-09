/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// handle not found routes
import { NextFunction, Request, Response } from 'express'

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    status: 'error',
    message: 'API Not Found',
    data: null,
  })
}

export default notFound
