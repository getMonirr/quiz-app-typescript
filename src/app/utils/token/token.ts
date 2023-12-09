import { NextFunction, Request } from 'express'
import jwt from 'jsonwebtoken'
import macaddress from 'macaddress'
import config from '../../config'

// generate token
export const generateToken = async (email: string) => {
  const token = jwt.sign({ email }, config.jwt_secret as string, {
    algorithm: 'HS384',
    expiresIn: '24h',
  })

  return token
}

// save mac address in user device
export const saveMacAddress = async (req: Request, next: NextFunction) => {
  macaddress.one((err, mac) => {
    if (err) {
      next(err)
      return
    }

    req.mac = mac
  })
}
