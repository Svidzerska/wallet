var Luhn = require("luhn-js");

interface ValidatingFunctions {
  checkNumber: Function;
  checkExpireDate: Function;
  checkCvv: Function;
}

const validatingFunctions: ValidatingFunctions = {
  checkNumber: (val: string) => {
    let regExp = /\d/g;
    const digit = val.match(regExp)?.join("");
    return digit?.length !== 16
      ? { valid: false, name: "number", error: "16 symbols are required" }
      : Luhn.isValid(digit)
      ? { valid: true, name: "number", error: "" }
      : { valid: false, name: "number", error: "not card number" };
  },

  checkExpireDate: (val: string) => {
    const regExp: RegExp = /^[0-9]{2}\/[0-9]{2}$/;
    return regExp.test(val)
      ? { valid: true, name: "date", error: "" }
      : { valid: false, name: "date", error: "wrong date" };
  },

  checkCvv: (val: number) => {
    return val.toString().length === 3
      ? { valid: true, name: "cvv", error: "" }
      : { valid: false, name: "cvv", error: "wrong cvv" };
  },
};

export default validatingFunctions;
