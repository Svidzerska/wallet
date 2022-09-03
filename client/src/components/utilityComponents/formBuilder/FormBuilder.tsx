import React, { FormEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import NumberFormat from "react-number-format";

import "./formBuilder.scss";

import { setCurrentCard } from "../../../features/cards/cardsSlice";

import { Config } from "../../../interfaces/Config";
import { Card } from "../../../interfaces/Card";
import { Cash } from "../../../interfaces/Cash";
import { ValidationResult } from "../../../interfaces/ValidationResult";

import Select from "../select/Select";

interface Props {
  config: Config[];
  formName: string;
  formActionName: string;
  onSubmitToDo: Function;
  options: string[];
  autoFill?: Card | Cash;
  processInputValues?: Function;
}

const FormBuilder: React.FC<Props> = ({
  config,
  formName,
  formActionName,
  onSubmitToDo,
  options,
  autoFill,
  processInputValues,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<Card>(autoFill ? autoFill : {});
  const [isValid, setValid] = useState<boolean>(false);

  useEffect(() => {
    isValid && processInputValues && processInputValues(values);
  }, [isValid, values]);

  useEffect(() => {
    validInputsArray.includes(false) ? setValid(false) : setValid(true);
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
              options={options}
              onChange={handleChange}
              currentState={autoFill?.currency}
            />
            <p>*</p>
          </>
        ) : field.fieldName === "card_holder" ? (
          <input
            key={name}
            id={name}
            placeholder={field.placeholder}
            value={values[name]}
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
              value={values[name]}
              mask={field.mask}
              onChange={handleChange}
              required={field.required}
            />
            <p>*</p>
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
