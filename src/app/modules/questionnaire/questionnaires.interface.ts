import { Types } from 'mongoose'

export interface IQuestionnaire {
  name: string
  description: string
  avatarURL: string
  avatarKey: string
  category: 'assessment' | 'test' | 'general'
  questions: Types.ObjectId[]
  submittedCount: number
  createdBy: string
}
