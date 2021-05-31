import { encode } from 'js-base64';
import { nanoid } from 'nanoid';
import { useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../props/FormProps';

export const FormSelect = (formInputProps: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  if (!formInputProps.selectOptions) {
    console.error(`[QuestionBank] selectOptions is missing on question '${formInputProps.name}'`);
  }
  if (formInputProps.selectOptions && formInputProps.selectOptions.length === 0) {
    console.error(
      `[QuestionBank] selectOptions is empty on question ${formInputProps.name}. Add some strings to the array to render options.`,
    );
  }
  return (
    <div className="mb-10">
      <label htmlFor={encode(formInputProps.label)} className="cursor-pointer">
        {formInputProps.label}
        {formInputProps.isRequired && (
          <span className="ml-2">
            <code className="text-red-500">*</code>
          </span>
        )}
      </label>
      <select
        id={encode(formInputProps.label)}
        className="mt-3 w-full py-3 px-4 border border-gray-500 rounded-md font-medium cursor-pointer hover:border-gray-900 transition-colors shadow-sm"
        {...register(formInputProps.name, { required: formInputProps.isRequired })}>
        {formInputProps.selectOptions &&
          formInputProps.selectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.display}
            </option>
          ))}
      </select>
      {errors && errors[formInputProps.name] && (
        <span className="block mt-2 text-sm text-red-500">This field is required.</span>
      )}
    </div>
  );
};
