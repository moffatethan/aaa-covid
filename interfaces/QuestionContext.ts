import { IQuestion } from "./Question";
import { IQuestionSection, SingleOrGroupQuestion } from "./QuestionSection";

export interface IQuestionContext {
  sections: IQuestionSection[];
  getQuestionsBySection: (id: string) => SingleOrGroupQuestion[];
  renderSectionQuestions: (questions: SingleOrGroupQuestion[]) => JSX.Element[];
}
