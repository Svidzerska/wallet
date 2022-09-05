import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";

import NumberFormat from "react-number-format";

// import { setCurrentCard } from "../../../features/cards/cardsSlice";

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

const FormFormik: React.FC<Props> = ({
  config,
  formName,
  formActionName,
  onSubmitToDo,
  options,
  autoFill,
}): JSX.Element => {
  //form consist of

  const formik = useFormik({
    initialValues: config.reduce((obj: { [fieldName: string]: string }, element: Config, index: number) => {
      obj[element.fieldName] = "";
      return obj;
    }, {}),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const listOfFields: JSX.Element[] = config.map((field: Config) => {
    const name = field.fieldName;

    return (
      <fieldset key={name}>
        {field.type === "select" ? (
          <>
            <Select
              key={name}
              id={name}
              name={name}
              required={true}
              options={options}
              onChange={formik.handleChange}
              currentState={autoFill?.currency}
            />
            <p>*</p>
          </>
        ) : field.fieldName === "card_holder" ? (
          <input
            key={name}
            id={name}
            placeholder={field.placeholder}
            value={formik.values.name}
            onChange={formik.handleChange}
            required={field.required}
          />
        ) : (
          <>
            <NumberFormat
              key={name}
              id={name}
              placeholder={field.placeholder}
              format={field.format}
              value={formik.values.name}
              mask={field.mask}
              onChange={formik.handleChange}
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
      <form onSubmit={formik.handleSubmit}>
        {listOfFields}
        <input type="submit" value={formActionName} />
      </form>
    </>
  );
};

export default FormFormik;
