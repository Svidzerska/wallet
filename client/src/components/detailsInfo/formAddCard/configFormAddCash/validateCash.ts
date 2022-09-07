import * as Yup from "yup";

export const validateCash = {
  amount: Yup.string()
    .required("Required")
    .test("11111", "is not 11111", (value) => (value ? /^11111/.test(value) : false))
    .max(7, "Maximum cash amount is 1 000 000"),
};
