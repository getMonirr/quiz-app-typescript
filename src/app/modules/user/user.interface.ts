/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  mac: string
  role: 'patient' | 'doctor' | 'admin'
  results: Types.ObjectId[]
}

export interface UserModel extends Model<IUser> {
  isUserExists(email: string): IUser
}
