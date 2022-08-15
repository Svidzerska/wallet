import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import "./addCash.scss";

import { saveCash, setAddCash, setCurrentCash } from "../../../../features/cash/cashSlice";

import { configFormAddCash } from "../configFormAddCash/configFormAddCash";
import FormBuilder from "../../../utilityComponents/formBuilder/FormBuilder";
import { Cash } from "../../../../interfaces/Cash";

const AddCash: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentCash: Cash | null = useAppSelector((state) => state.cash.currentCash);
  const cashFromServer: Cash[] = useAppSelector((state) => state.cash.cashFromServer);

  useEffect(() => {
    console.log(currentCash);
  }, [currentCash]);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(setAddCash(false));

    console.log(cashFromServer);
    currentCash?.currency
      ? dispatch(saveCash({ ...currentCash, id: currentCash?.currency }))
      : dispatch(saveCash({ ...currentCash, id: "UAH", currency: "UAH" }));
  };

  const cancelAddCash = (): void => {
    dispatch(setAddCash(false));
  };

  const getCashFromValues = (values: Cash): void => {
    dispatch(setCurrentCash({ ...values }));
  };

  return (
    <section className="cashPopup_section">
      <div className="cashPopup">
        <FormBuilder
          config={configFormAddCash}
          formName="Додати готівку"
          formActionName="Зберегти"
          onSubmitToDo={handleSubmit}
          processInputValues={getCashFromValues}
        />
        <button onClick={cancelAddCash} className="cancelAddCashButton">
          Скасувати
        </button>
      </div>
    </section>
  );
};

export default AddCash;
