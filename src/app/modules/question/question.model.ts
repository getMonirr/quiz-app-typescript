import mongoose from 'mongoose'

// this model contains details regarding the questions used in questionnaire

const questionSchema = new mongoose.Schema({
  questionType: {
    type: String,
    required: true,
    enum: [
      'One Right Answer',
      'Slider',
      'Multiple Select',
      'Text Input',
      'Picture Upload',
    ],
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Option',
    },
  ],
  // defines number of images the user needs to upload
  numberOfImages: {
    type: Number,
  },
  // specifies what type of image it is for example nose image, xray etc.
  imageType: {
    type: String,
  },
  // additional information about the question given by the admin or the doctor
  additionalNotes: {
    type: String,
  },
})

const Question = mongoose.model('Question', questionSchema)

export default Question
