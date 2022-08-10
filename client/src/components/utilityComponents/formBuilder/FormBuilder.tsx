import React, { FormEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import NumberFormat from "react-number-format";

import "./formBuilder.scss";

import { Config } from "../../../interfaces/Config";
import { ValidationResult } from "../../../interfaces/ValidationResult";
import Select from "../select/Select";
import { Card } from "../../../interfaces/Card";

interface Props {
  config: Config[];
  formName: string;
  formActionName: string;
  onSubmitToDo: Function;
  getCard: Function;
}

const FormBuilder: React.FC<Props> = ({ config, formName, formActionName, onSubmitToDo, getCard }): JSX.Element => {
  const [values, setValues] = useState<{ [id: string]: string }>({});
  const [isValid, setValid] = useState<boolean>(false);

  useEffect(() => {
    console.log(values);
    validInputsArray.includes(false) ? setValid(false) : setValid(true);
    getCard(values);
  }, [values]);

  //form consist of
  const handleChange = (e: FormEvent<HTMLInputElement> | FormEvent<HTMLSelectElement>): void => {
    const value: string = e.currentTarget.value;
    const id: string = e.currentTarget.id;
    setValues({ ...values, [id]: value });
  };

  let validInputsArray: (boolean | undefined)[] = [];

  const listOfFields: JSX.Element[] = config.map((field: Config) => {
    const name = field.fieldName;

    const validationResult: ValidationResult[] = field.validationMethods.map((rule) => {
      return values[name] ? rule(values[name]) : { valid: false };
    });

    let unValidInput: ValidationResult | undefined = validationResult.find((element) => element?.valid === false);

    validInputsArray.push(unValidInput?.valid);

    return (
      <fieldset key={name}>
        {validationResult.map(
          (element, index) =>
            element.error &&
            element?.error !== "" && (
              <label htmlFor={name} key={`name` + index}>
                <i>{element?.error}</i>
                <br />
              </label>
            )
        )}
        {field.type === "select" ? (
          <>
            <Select
              key={name}
              id={name}
              name={name}
              required={true}
              options={["UAH", "USD", "EUR"]}
              onChange={handleChange}
            />
            <span>*</span>
          </>
        ) : field.fieldName === "card_holder" ? (
          <input
            key={name}
            id={name}
            placeholder={field.placeholder}
            value={values[name] ? values[name] : ""}
            onChange={handleChange}
            required={field.required}
          />
        ) : (
          <>
            <NumberFormat
              key={name}
              id={name}
              placeholder={field.placeholder}
              format={field.format}
              value={values[name] ? values[name] : ""}
              mask={field.mask}
              onChange={handleChange}
              required={field.required}
            />
            <span>*</span>
          </>
        )}
        <br />
      </fieldset>
    );
  });

  return (
    <>
      <h1>{formName}</h1>
      <form onSubmit={(e): void => onSubmitToDo(e)}>
        {listOfFields}
        <input type="submit" value={formActionName} disabled={!isValid} />
      </form>
    </>
  );
};

export default FormBuilder;
