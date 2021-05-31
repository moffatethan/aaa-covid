import { PropsWithChildren } from 'react';
import { IQuestionSection } from '../../interfaces/QuestionSection';
import { Container } from '../Container';

type FormSectionProps = {
  section: IQuestionSection;
  number: number;
};

export const FormSection = ({ section, number, children }: PropsWithChildren<FormSectionProps>): JSX.Element => {
  return (
    <div className="font-body font-medium text-gray-800">
      <div className="max-w-2xl mx-auto bg-white mt-2 border border-gray-300 md:rounded-md">
        <Container>
          <h3 className="font-sans text-lg text-gray-700">
            <span className="mr-2 rounded-full text-gray-400">{number}.</span>
            {section.name}
          </h3>
          {section.details}
        </Container>
      </div>
      <Container>{children}</Container>
    </div>
  );
};
