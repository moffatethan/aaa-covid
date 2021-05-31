import { encode } from 'js-base64';
import { useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../props/FormProps';

export const FormRadio = (formInputProps: FormInputProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mb-10">
      <label htmlFor={encode(formInputProps.label)}>
        {formInputProps.label}
        {formInputProps.isRequired && (
          <span className="ml-2">
            <code className="text-red-500">*</code>
          </span>
        )}
      </label>
      <div className="block mt-4">
        {formInputProps.options &&
          formInputProps.options.map((option: any) => {
            return (
              <label
                key={option.label}
                className={`block text-md font-medium mb-3 bg-white p-5 border border-gray-300 rounded-md cursor-pointer hover:border-gray-500 transition-colors shadow-sm ${
                  errors && errors[formInputProps.name] && 'border-red-500'
                }`}
                htmlFor={encode(option.label + formInputProps.label)}>
                <input
                  className="shadow-sm"
                  id={encode(option.label + formInputProps.label)}
                  type={formInputProps.type}
                  value={option.label.toLowerCase()}
                  {...register(formInputProps.name, { required: formInputProps.isRequired })}
                />
                <span className="ml-2">{option.label}</span>
              </label>
            );
          })}
      </div>
      {formInputProps.help && <p className="text-xs mt-2 text-gray-400 font-normal">{formInputProps.help}</p>}
      {errors && errors[formInputProps.name] && (
        <span className="block mt-2 text-sm text-red-500">This field is required.</span>
      )}
    </div>
  );
};
