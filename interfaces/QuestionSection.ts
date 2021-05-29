import { IQuestion } from "./Question";

// [IQuestion, IQuestion] ensures only two questions are grouped together.
export type SingleOrGroupQuestion = IQuestion | [IQuestion, IQuestion]; 

/**
 * A section of questions to present to the employee.
 *
 * @example "Personal Detail" section
 * @interface IQuestionSection
 */
export interface IQuestionSection {
  id: string;
  name: string;
  details: string;
  questions: SingleOrGroupQuestion[];
}
