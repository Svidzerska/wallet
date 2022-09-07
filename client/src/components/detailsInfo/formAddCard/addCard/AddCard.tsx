import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import "./addCard.scss";

import { getCards, saveCard, setAddCard } from "../../../../features/cards/cardsSlice";

import { configFormAddCard } from "../configFormAddCard/configFormAddCard";
import { Card } from "../../../../interfaces/Card";

import FormAddCard from "../FormAddCard";
import { FormikValues } from "formik";

const AddCard: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentCard: Card | null = useAppSelector((state) => state.cards.currentCard);

  const handleSubmit = (values: FormikValues): void => {
    dispatch(setAddCard(false));
    currentCard?.currency
      ? dispatch(saveCard({ ...values, id: Math.random().toString() })).then(() => dispatch(getCards()))
      : dispatch(saveCard({ ...values, id: Math.random().toString(), currency: "UAH" })).then(() =>
          dispatch(getCards())
        );
  };

  return (
    <FormAddCard
      config={configFormAddCard}
      formName="Додавання картки"
      formActionName="Додати картку"
      handleSubmit={handleSubmit}
    />
  );
};

export default AddCard;
