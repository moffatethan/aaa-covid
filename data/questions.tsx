import { nanoid } from 'nanoid';
import { FormInput } from '../components/FormInput/FormInput';
import { IQuestionBank } from '../interfaces/QuestionBank';

export const questionBank: IQuestionBank = {
  store: [
    {
      id: nanoid(),
      name: 'Personal Details',
      details: 'To write',
      questions: [
        {
          isRequired: true,
          input: {
            element: (
              <FormInput
                label="First Name"
                props={{
                  type: 'text',
                }}
              />
            ),
          },
        },
        {
          isRequired: true,
          input: {
            element: (
              <FormInput
                label="Last Name"
                props={{
                  type: 'text',
                }}
              />
            ),
          },
        },
        {
          isRequired: true,
          input: {
            element: (
              <FormInput
                label="Email Address"
                props={{
                  type: 'text',
                  required: true,
                }}
              />
            ),
          },
        },
      ],
    },
  ],
};
