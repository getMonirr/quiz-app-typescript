import mongoose from 'mongoose'
import { IQuestionnaire } from './questionnaires.interface'

// Base schema with common fields used in all types of quetion models
const questionnaire = new mongoose.Schema<IQuestionnaire>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
    },
    avatarKey: {
      type: String,
    },
    category: {
      type: String,
      enum: ['assessment', 'test', 'general'],
      required: true,
    },
    questions: [
      {
        // refrencing the questions from question model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
    submittedCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

// Create a model from the base schema
const Questionnaire = mongoose.model<IQuestionnaire>(
  'Questionnaire',
  questionnaire,
)

export default Questionnaire
