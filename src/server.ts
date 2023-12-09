import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

let server: Server

async function main() {
  try {
    // connect to database
    await mongoose.connect(config.mongo_uri as string)
    console.log('Connected to database')

    server = app.listen(config.port, () => {
      console.log(`Server is Fire at ${config.port}`)
    })
  } catch (error) {
    console.log({ error })
  }
}

main()

// handle unhandled promise rejection
process.on('unhandledRejection', () => {
  console.log('shutting down server due to unhandled promise rejection...')

  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }

  process.exit(1)
})

// handle uncaught exception
process.on('uncaughtException', () => {
  console.log('shutting down server due to uncaught exception...')

  process.exit(1)
})
