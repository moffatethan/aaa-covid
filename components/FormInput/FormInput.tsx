import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { encode, decode } from 'js-base64';

type FormInputProps = {
  label: string;
  isRequired?: boolean;
  props?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};

export const FormInput = (formInputProps: FormInputProps) => {
  console.log(formInputProps);
  return (
    <div className="mb-3">
      <label htmlFor={encode(formInputProps.label)} className="cursor-pointer">
        {formInputProps.label}
        {formInputProps.isRequired && (
          <span className="ml-2">
            <code className="text-red-500">*</code>
          </span>
        )}
      </label>
      <input
        id={encode(formInputProps.label)}
        className="mt-3 w-full py-3 px-4 border border-gray-500 rounded-md"
        {...formInputProps.props}
      />
    </div>
  );
};
