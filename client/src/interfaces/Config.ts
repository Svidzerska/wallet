import { StringSchema } from "yup";

export * as Yup from "yup";

export interface Config {
  fieldName: string;
  type: string;
  placeholder: string;
  validationMethods: Function[] | any;
  required?: boolean;
  format?: string | any;
  mask?: string;
}
