import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import "./addCard.scss";

import { getAddCardInfo, saveCard, setAddCard, setCurrentCard } from "../../../../features/cards/cardsSlice";

import { configFormAddCard } from "../configFormAddCard/configFormAddCard";
import FormBuilder from "../../../utilityComponents/formBuilder/FormBuilder";
import { Card } from "../../../../interfaces/Card";

const AddCard: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentCard: Card | null = useAppSelector((state) => state.cards.currentCard);
  const addCardInfo: { scheme: string; type: string } = useAppSelector((state) => state.cards.addCardInfo);

  useEffect(() => {
    dispatch(setCurrentCard({ ...currentCard, ...addCardInfo }));
  }, [addCardInfo]);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(setAddCard(false));
    currentCard?.currency
      ? dispatch(saveCard({ ...currentCard, id: Math.random().toString() }))
      : dispatch(saveCard({ ...currentCard, id: Math.random().toString(), currency: "UAH" }));
  };

  //values?.card_number === currentCard?.card_number
  const getAditionInfoForCard = (values: Card): void => {
    const digit = `${values?.card_number?.substring(0, 4)}${values?.card_number?.substring(5, 9)}`;
    dispatch(getAddCardInfo(digit));
    dispatch(setCurrentCard({ ...values }));
  };

  return (
    <FormBuilder
      config={configFormAddCard}
      formName="Додавання картки"
      formActionName="Додати картку"
      onSubmitToDo={handleSubmit}
      processInputValues={getAditionInfoForCard}
    />
  );
};

export default AddCard;
