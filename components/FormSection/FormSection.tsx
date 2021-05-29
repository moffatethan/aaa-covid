import { useQuestionBank } from '../../context/useQuestionBank';
import { IQuestionSection } from '../../interfaces/QuestionSection';
import { Container } from '../Container';

type FormSectionProps = {
  section: IQuestionSection;
};

export const FormSection = ({ section }: FormSectionProps): JSX.Element => {
  const { renderSectionQuestions } = useQuestionBank();
  return (
    <div className="font-body font-medium text-gray-800">
      <div className="max-w-2xl mx-auto bg-white mt-2 border border-gray-300 rounded-md">
        <Container>
          <h3 className="font-sans text-lg text-gray-700">{section.name}</h3>
        </Container>
      </div>
      <Container>{renderSectionQuestions(section.questions)}</Container>
    </div>
  );
};
