import express from 'express'
import { userAuthRoutes } from '../modules/user/user.route'

const router = express.Router()

// define routes here
const routes = [
  {
    path: '/auth',
    route: userAuthRoutes,
  },
]

// dynamically add routes
routes.forEach(route => {
  router.use(route.path, route.route)
})

export const mainRoutes = router
