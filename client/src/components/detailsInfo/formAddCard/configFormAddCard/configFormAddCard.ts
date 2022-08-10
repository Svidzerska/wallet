import validatingFunctions from "../../../../utilities/validatingFunctions";

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
    validationMethods: [validatingFunctions.checkNumber],
    required: true,
    format: "#### #### #### ####",
    mask: "_",
  },
  {
    fieldName: "exp_date",
    type: "text",
    placeholder: "Expire date",
    validationMethods: [validatingFunctions.checkExpireDate],
    required: true,
    format: cardExpiry,
    mask: "",
  },
  {
    fieldName: "cvv",
    type: "text",
    placeholder: "CVV",
    validationMethods: [validatingFunctions.checkCvv],
    required: true,
    format: "###",
    mask: "",
  },
  {
    fieldName: "card_holder",
    type: "text",
    placeholder: "Card holder",
    validationMethods: [],
    required: false,
  },
  {
    fieldName: "amount",
    type: "text",
    placeholder: "Amount",
    validationMethods: [],
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
