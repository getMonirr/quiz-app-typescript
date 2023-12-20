import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { QuestionnaireServices } from './questionnaire.service'

const createQuestionnaire = catchAsync(async (req, res) => {
  const newQuestionnaire =
    await QuestionnaireServices.createQuestionnaireInToDB(req.body)

  if (!newQuestionnaire) {
    return sendResponse(res, {
      status: 'fail',
      statusCode: 400,
      message: 'Questionnaire not created',
      data: null,
    })
  }

  sendResponse(res, {
    status: 'success',
    statusCode: 201,
    message: 'Questionnaire created successfully',
    data: newQuestionnaire,
  })
})

export const QuestionnaireControllers = {
  createQuestionnaire,
}

const addToNumber = (num1, num2) => {
  return num1 + num2
}
