import { FormatInputValueFunction } from "react-number-format";
import { StringSchema } from "yup";

export interface Config {
  fieldName: string;
  type: string;
  placeholder: string;
  validationMethods: StringSchema;
  required?: boolean;
  format?: string | FormatInputValueFunction;
  mask?: string;
}
