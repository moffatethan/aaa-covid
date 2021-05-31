import { IInput } from "./Input";

/**
 * Representation of a question in the question bank.
 *
 * @interface IQuestion
 */
export interface IQuestion {
  name: string;
  label: string;
  isRequired?: boolean;
  type?: string;
  options?: {}[];
  selectOptions?: string[];
}