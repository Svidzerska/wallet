import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import "./addCash.scss";

import { setAddCash } from "../../../../features/cash/cashSlice";

import { configFormAddCash } from "../configFormAddCash/configFormAddCash";
import FormBuilder from "../../../utilityComponents/formBuilder/FormBuilder";

const AddCash: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
  };

  const cancelAddCash = (): void => {
    dispatch(setAddCash(false));
  };

  return (
    <section className="cashPopup_section">
      <div className="cashPopup">
        <FormBuilder
          config={configFormAddCash}
          formName="Додати готівку"
          formActionName="Зберегти"
          onSubmitToDo={handleSubmit}
        />
        <button onClick={cancelAddCash} className="cancelAddCashButton">
          Скасувати
        </button>
      </div>
    </section>
  );
};

export default AddCash;
