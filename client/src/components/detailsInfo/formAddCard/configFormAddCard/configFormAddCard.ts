import validatingFunctions from "../../../../utilities/validatingFunctions";
import * as Yup from "yup";
var Luhn = require("luhn-js");

function limit(val: string, max: string) {
  if (val.length === 1 && val[0] > max[0]) {
    val = "0" + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = "01";

      //this can happen when user paste number
    } else if (val > max) {
      val = max;
    }
  }

  return val;
}

const cardExpiry = (val: string): string => {
  let month = limit(val.substring(0, 2), "12");
  let year = val.substring(2, 4);

  return month + (year.length ? "/" + year : "");
};

export const configFormAddCard = [
  {
    fieldName: "card_number",
    type: "text",
    placeholder: "Card number",
    // validationMethods: [validatingFunctions.checkNumber],
    validationMethods: Yup.string()
      .required("Required")
      .test("length", "16 symbols are required", (value) =>
        value ? value.match(/\d/g)?.join("").length === 16 : false
      )
      .test("Luhn-algorithm", "not card number", (value) =>
        value ? Luhn.isValid(value.match(/\d/g)?.join("")) : false
      ),
    required: true,
    format: "#### #### #### ####",
    mask: "_",
  },
  {
    fieldName: "exp_date",
    type: "text",
    placeholder: "Expire date",
    // validationMethods: [validatingFunctions.checkExpireDate],
    validationMethods: Yup.string()
      .required("Required")
      .test("date", "wrong date", (value) => (value ? /^[0-9]{2}\/[0-9]{2}$/.test(value) : false)),
    required: true,
    format: cardExpiry,
    mask: "",
  },
  {
    fieldName: "cvv",
    type: "text",
    placeholder: "CVV",
    // validationMethods: [validatingFunctions.checkCvv],
    validationMethods: Yup.string().required("Required").length(3, "wrong cvv"),
    required: true,
    format: "###",
    mask: "",
  },
  {
    fieldName: "card_holder",
    type: "text",
    placeholder: "Card holder",
    validationMethods: Yup.string(),
    required: false,
  },
  {
    fieldName: "amount",
    type: "text",
    placeholder: "Amount",
    validationMethods: Yup.string().required("Required"),
    required: true,
  },
  {
    fieldName: "currency",
    type: "select",
    placeholder: "Currency",
    validationMethods: Yup.string(),
    required: true,
  },
];
