import validatingFunctions from "../../../../utilities/validatingFunctions";

export const configFormAddCash = [
  {
    fieldName: "amount",
    type: "text",
    placeholder: "Amount",
    validationMethods: [validatingFunctions.checkCvv],
    required: true,
  },
  {
    fieldName: "currency",
    type: "select",
    placeholder: "Currency",
    validationMethods: [],
    required: true,
  },
];
