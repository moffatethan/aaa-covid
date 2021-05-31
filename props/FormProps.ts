import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type FormInputProps = {
  label: string;
  name: string;
  isRequired?: boolean;
  help?: string;
  type?: string;
  options?: {}[];
  selectOptions?: { value: string, display: string }[];
};
