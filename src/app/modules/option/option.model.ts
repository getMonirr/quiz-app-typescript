import mongoose from 'mongoose'

// this model contains options of the question

const OptionSchema = new mongoose.Schema({
  optionText: {
    type: String,
    required: true,
  },
  // for assesment question it would contain diffrent categories that are to be assesed
  value: {
    type: String,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
})

const Option = mongoose.model('Option', OptionSchema)

export default Option
