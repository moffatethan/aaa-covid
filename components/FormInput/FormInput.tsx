import { encode } from 'js-base64';
import { useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../props/FormProps';

export const FormInput = (formInputProps: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
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
      <input
        id={encode(formInputProps.label)}
        className={`mt-3 w-full py-3 px-4 border border-gray-500 rounded-md font-medium transition-colors shadow-sm hover:border-gray-900 ${
          errors && errors[formInputProps.name] && 'border-red-500'
        }`}
        {...register(formInputProps.name, { required: formInputProps.isRequired })}
      />
      {formInputProps.help && <p className="text-xs mt-2 text-gray-400 font-normal">{formInputProps.help}</p>}
      {errors && errors[formInputProps.name] && (
        <span className="block mt-2 text-sm text-red-500">This field is required.</span>
      )}
    </div>
  );
};
