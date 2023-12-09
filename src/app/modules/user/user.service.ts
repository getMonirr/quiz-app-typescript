/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt'
import config from '../../config'
import { generateToken } from '../../utils/token/token'
import { IUser } from './user.interface'
import User from './user.model'

// create user in database
const createUserInToDB = async (user: IUser) => {
  const hashedPassword = await bcrypt.hash(
    user?.password,
    Number(config.salt_round),
  )

  // first check if the user already exists in database
  const isUserExists = await User.isUserExists(user?.email)

  if (isUserExists) {
    throw new Error('User already exists')
  }

  const createdUser = await User.create({
    ...user,
    password: hashedPassword,
  })

  return createdUser
}

// user login
const loginUser = async (email: string, password: string) => {
  // find the user in database
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('No such User exists')
  }

  const isPasswordCorrect = await bcrypt.compare(password, user?.password)

  if (!isPasswordCorrect) {
    throw new Error('Password is incorrect')
  }

  const token = await generateToken(email)

  return { token }
}

// get a single user from database
const getUserByEmailFromDB = async (email: string) => {
  const user = await User.findOne({ email })
  return user
}

export const userServices = {
  loginUser,
  createUserInToDB,
  getUserByEmailFromDB,
}
