import * as Yup from "yup";

export const validateCash = {
  amount: Yup.string().max(7, "Maximum cash amount is 1000000").required("Required"),
};
