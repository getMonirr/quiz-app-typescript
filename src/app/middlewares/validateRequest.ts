// validate request middleware
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check validation
      // if everything is ok, go to next
      await schema.parseAsync({
        body: req?.body,
      })

      next()
    } catch (error) {
      next(error)
    }
  }
}

export default validateRequest
