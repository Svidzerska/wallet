import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";

import NumberFormat from "react-number-format";

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

  const objConfig = config.reduce((obj: { [fieldName: string]: string | number }, element: Config, index: number) => {
    console.log(element.fieldName);
    obj[element.fieldName] = "";
    return obj;
  }, {});

  const objValid = config.reduce((obj: { [fieldName: string]: Yup.StringSchema }, element: Config, index: number) => {
    obj[element.fieldName] = element.validationMethods;
    console.log(obj);
    return obj;
  }, {});

  const formik = useFormik({
    initialValues: autoFill ? autoFill : objConfig,
    validationSchema: Yup.object(objValid),
    onSubmit: (values): void => {
      onSubmitToDo(values);
    },
  });

  const listOfFields: JSX.Element[] = config.map((field: Config) => {
    const name = field.fieldName;

    console.log(formik.values[name]);
    console.log(formik.errors[name], formik.touched[name]);

    return (
      <fieldset key={name}>
        {formik.errors[name] ? (
          <label htmlFor={name}>
            <i>{formik.errors[name]}</i>
            <br />
          </label>
        ) : null}
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
            value={formik.values[name]}
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
              value={formik.values[name]}
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
