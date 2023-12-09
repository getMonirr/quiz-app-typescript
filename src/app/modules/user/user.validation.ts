import { z } from 'zod'

// user singUp / register validation schema
const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(3).max(8),
    mac: z.string().optional(),
    role: z.enum(['patient', 'doctor', 'admin']).default('patient'),
    results: z.array(z.string()).optional(),
  }),
})

// user login validation schema
const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(3).max(8),
  }),
})

export const userValidations = {
  userRegisterValidationSchema,
  userLoginValidationSchema,
}
