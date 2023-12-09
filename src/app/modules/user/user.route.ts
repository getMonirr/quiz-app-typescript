import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { userControllers } from './user.controller'
import { userValidations } from './user.validation'

//define router
const router = express.Router()

// signup route
router.post(
  '/signup',
  validateRequest(userValidations.userRegisterValidationSchema),
  userControllers.signup,
)

//login route
router.post(
  '/login',
  validateRequest(userValidations.userLoginValidationSchema),
  userControllers.login,
)

// // logout route
router.get('/logout', userControllers.logout)

// // get a user
router.get('/get-user/:email', userControllers.getUserByEmail)

export const userAuthRoutes = router
