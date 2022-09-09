import * as Yup from "yup";

export const configFormAddCash = [
  {
    fieldName: "amount",
    type: "text",
    placeholder: "Amount",
    validationMethods: Yup.string()
      .required("Required")
      .max(7, "Maximum cash amount for one add operation is 1 000 000"),
  },
  {
    fieldName: "currency",
    type: "select",
    placeholder: "Currency",
    validationMethods: Yup.string(),
    required: true,
  },
];
