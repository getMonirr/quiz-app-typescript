import Questionnaire from './questionnaire.model'
import { IQuestionnaire } from './questionnaires.interface'

const createQuestionnaireInToDB = async (questionnaire: IQuestionnaire) => {
  const newQuestionnaire = await Questionnaire.create(questionnaire)

  return newQuestionnaire
}

export const QuestionnaireServices = {
  createQuestionnaireInToDB,
}
