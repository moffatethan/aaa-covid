import { FormEventHandler, MouseEventHandler } from "react";
import { UseFormRegister, FieldValues, DeepMap, FieldError } from 'react-hook-form';
import { IQuestionSection, SingleOrGroupQuestion } from "./QuestionSection";

export interface IQuestionContext {
  sections: IQuestionSection[];
  getQuestionsBySection: (id: string) => SingleOrGroupQuestion[];
  renderSectionQuestions: (questions: SingleOrGroupQuestion[]) => JSX.Element[];
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}
