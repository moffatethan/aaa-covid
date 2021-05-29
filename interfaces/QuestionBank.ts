import { IQuestion } from "./Question";
import { IQuestionSection } from "./QuestionSection";

/**
 * Holds all the assessment questions to present to the employee.
 *
 * @interface IQuestionBank
 */
export interface IQuestionBank {
  store: IQuestionSection[];
}