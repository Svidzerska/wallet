import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import "./addCash.scss";

import {
  editCash,
  saveCash,
  setAddCash,
  setCurrentCash,
  setEditingPocketCurrency,
} from "../../../../features/cash/cashSlice";

import { configFormAddCash } from "../configFormAddCash/configFormAddCash";
import FormBuilder from "../../../utilityComponents/formBuilder/FormBuilder";
import { Cash } from "../../../../interfaces/Cash";

const AddCash: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentCash: Cash | null = useAppSelector((state) => state.cash.currentCash);
  const cashFromServer: Cash[] = useAppSelector((state) => state.cash.cashFromServer);
  const editingPocket: Cash | null = useAppSelector((state) => state.cash.editingPocket);

  useEffect(() => {
    console.log(currentCash);
  }, [currentCash]);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(setAddCash(false));
    dispatch(setEditingPocketCurrency({}));
    const currency = currentCash?.currency ? currentCash?.currency : "UAH";
    const cashPocket = cashFromServer.find((pocket) => pocket.currency === currency);
    cashPocket ? dispatch(editCash({ ...currentCash, currency })) : dispatch(saveCash({ ...currentCash, currency }));
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
          autoFill={editingPocket}
        />
        <button onClick={cancelAddCash} className="cancelAddCashButton">
          Скасувати
        </button>
      </div>
    </section>
  );
};

export default AddCash;
