// same as jwtDecoded type in interface folder
type TUser = {
  email?: string
  iat: number
  exp: number
}

// customize the express request object
declare namespace Express {
  export interface Request {
    user?: TUser
    mac?: string
  }
}
