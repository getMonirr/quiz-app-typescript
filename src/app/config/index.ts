import dotenv from 'dotenv'

// app config file
dotenv.config({ path: process.cwd() + '/.env' })

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 8000,
  jwt_secret: process.env.JWT_SECRET_KEY,
  mongo_uri: process.env.MONGO_URI,
  salt_round: process.env.SALT_ROUND,
}
