import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import NumberFormat from "react-number-format";

import "./formFormik.scss";

import { Config } from "../../../interfaces/Config";
import { Card } from "../../../interfaces/Card";
import { Cash } from "../../../interfaces/Cash";
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
    obj[element.fieldName] = "";
    return obj;
  }, {});

  const objValid = config.reduce((obj: { [fieldName: string]: Yup.StringSchema }, element: Config, index: number) => {
    obj[element.fieldName] = element.validationMethods;
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

    return (
      <fieldset key={name}>
        {formik.touched[name] && formik.errors[name] ? (
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
              onBlur={formik.handleBlur}
              currentState={autoFill?.currency}
            />
            <p>*</p>
          </>
        ) : field.fieldName === "card_holder" ? (
          <input
            key={name}
            id={name}
            name={name}
            placeholder={field.placeholder}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={field.required}
          />
        ) : (
          <>
            <NumberFormat
              key={name}
              id={name}
              name={name}
              placeholder={field.placeholder}
              format={field.format}
              value={formik.values[name]}
              mask={field.mask}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
