import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { FormikValues } from "formik";

import { Cash } from "../../../../interfaces/Cash";

import "./addCash.scss";

import { editCash, getCash, saveCash, setAddCash, setEditingPocket } from "../../../../features/cash/cashSlice";

import { configFormAddCash } from "../configFormAddCash/configFormAddCash";

import FormFormik from "../../../utilityComponents/formFormik/FormFormik";

const AddCash: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const cashFromServer: { result: Cash[]; message: string | null } = useAppSelector(
    (state) => state.cash.cashFromServer
  );
  const editingPocket: Cash | null = useAppSelector((state) => state.cash.editingPocket);

  const handleSubmit = (values: FormikValues): void => {
    const editAmount = editingPocket.amount;

    dispatch(setAddCash(false));
    dispatch(setEditingPocket({}));

    const currency = values?.currency ? values?.currency : "UAH";
    const cashPocket = cashFromServer.result.find((pocket) => pocket.currency === currency);
    cashPocket && editAmount
      ? dispatch(editCash({ ...values, currency })).then(() => dispatch(getCash()))
      : dispatch(saveCash({ ...values, currency })).then(() => dispatch(getCash()));
  };

  const cancelAddCash = (): void => {
    dispatch(setAddCash(false));
    dispatch(setEditingPocket({}));
  };

  return (
    <section className="cashPopup_section">
      <div className="cashPopup">
        <FormFormik
          config={configFormAddCash}
          formName={editingPocket.amount ? "Редагувати готівку" : "Додати готівку"}
          formActionName="Зберегти"
          onSubmitToDo={handleSubmit}
          options={editingPocket.currency ? [editingPocket.currency] : ["UAH", "USD", "EUR"]}
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
