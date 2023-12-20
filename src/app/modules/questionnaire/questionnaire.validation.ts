import z from 'zod'

export const questionnaireValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  avatarURL: z.string().optional(),
  avatarKey: z.string().optional(),
  category: z.enum(['assessment', 'test', 'general']),
  questions: z.array(z.string()),
  submittedCount: z.number().default(0),
  createdBy: z.string(),
})
