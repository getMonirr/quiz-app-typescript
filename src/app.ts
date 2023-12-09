import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import { mainRoutes } from './app/routes'

// create express app
const app: Application = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// just testing purpose
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to our Amrutam Quiz App' })
})

// all routes will be here
app.use('/api/v1', mainRoutes)

// global error handler
app.use(globalErrorHandler)

// not found routes
app.use(notFound)

export default app
