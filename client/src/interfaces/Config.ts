import { FunctionDeclaration, FunctionExpression } from "typescript";

export interface Config {
  fieldName: string;
  type: string;
  placeholder: string;
  validationMethods: Function[];
  required: boolean;
  format?: string | any;
  mask?: string;
}
