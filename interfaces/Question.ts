import { IInput } from "./Input";

/**
 * Representation of a question in the question bank.
 *
 * @interface IQuestion
 */
export interface IQuestion {
  input: IInput;
  isRequired?: boolean;
}