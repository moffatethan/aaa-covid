import { nanoid } from 'nanoid';
import { cloneElement, createContext, PropsWithChildren, useContext, useState } from 'react';
import { IQuestionContext } from '../interfaces/QuestionContext';
import { IQuestionSection, SingleOrGroupQuestion } from '../interfaces/QuestionSection';

const QuestionContext = createContext<IQuestionContext>({} as IQuestionContext);

type QuestionProviderProps = {
  initialSections?: IQuestionSection[];
};
/**
 * Provide the data context for all question sections.
 * @param props initialSections to be rendered.
 * @returns
 */
export const QuestionProvider = ({
  initialSections,
  children,
}: PropsWithChildren<QuestionProviderProps>): JSX.Element => {
  const [sections] = useState<IQuestionSection[]>(initialSections || []);

  /**
   * Return a list of questions by their corresponding section.
   * @param id Id of the section. I.e, 'personal-details'
   * @returns `IQuestion[]` or `[]` if not found.
   */
  const getQuestionsBySection = (id: string): SingleOrGroupQuestion[] => {
    const sectionIndex = sections.findIndex((section) => section.id === id);
    if (sectionIndex > -1) {
      return sections[sectionIndex].questions;
    }
    return [];
  };

  /**
   * Render the form inputs for
   * @param questions
   * @returns
   */
  const renderSectionQuestions = (questions: SingleOrGroupQuestion[]): JSX.Element[] => {
    const renderedList = questions.map((question) => {
      if (Array.isArray(question)) {
        // render a group input.
        return [];
      }
      return cloneElement(question.input.element, { key: nanoid(), isRequired: question.isRequired });
    });

    // @ts-ignore
    return renderedList;
  };

  return (
    <QuestionContext.Provider
      value={{
        sections,
        getQuestionsBySection,
        renderSectionQuestions,
      }}>
      {children}
    </QuestionContext.Provider>
  );
};

/**
 * React hook for getting the current context of the question bank.
 * @returns Context
 */
export const useQuestionBank = () => {
  const ctx = useContext(QuestionContext);
  if (!ctx) throw new Error('useQuestionBank must be used within QuestionProvider');
  return ctx;
};
