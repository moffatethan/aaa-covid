import { IQuestion } from "./Question";

/**
 * A section of questions to present to the employee.
 *
 * @example "Personal Detail" section
 * @interface IQuestionSection
 */
export interface IQuestionSection {
  name: string;
  details?: JSX.Element;
}
