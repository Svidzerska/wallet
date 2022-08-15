import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import "./editCard.scss";

import {
  editCard,
  getAddCardInfo,
  setAddCard,
  setCurrentCard,
  setEditingCard,
} from "../../../../features/cards/cardsSlice";

import { configFormAddCard } from "../configFormAddCard/configFormAddCard";
import FormBuilder from "../../../utilityComponents/formBuilder/FormBuilder";
import { Card } from "../../../../interfaces/Card";

interface Props {
  editingCard: Card;
}

const EditCard: React.FC<Props> = ({ editingCard }): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentCard: Card | null = useAppSelector((state) => state.cards.currentCard);
  const addCardInfo: { scheme: string; type: string } = useAppSelector((state) => state.cards.addCardInfo);

  useEffect(() => {
    dispatch(setCurrentCard({ ...currentCard, ...addCardInfo }));
  }, [addCardInfo]);

  const handleSaveEdit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(setAddCard(false));
    if (
      currentCard &&
      !Object.keys({ ...currentCard, ...editingCard }).every((key) => currentCard[key] === editingCard[key])
    ) {
      dispatch(editCard({ ...currentCard }));
    }
    dispatch(setEditingCard(null));
  };

  const getAditionInfoForCard = (values: Card): void => {
    const digit = `${values?.card_number?.substring(0, 4)}${values?.card_number?.substring(5, 9)}`;
    dispatch(getAddCardInfo(digit));
    dispatch(setCurrentCard({ ...values }));
  };

  return (
    <FormBuilder
      config={configFormAddCard}
      formName="Редагування картки"
      formActionName="Зберегти зміни"
      onSubmitToDo={handleSaveEdit}
      autoFill={editingCard}
      processInputValues={getAditionInfoForCard}
    />
  );
};

export default EditCard;
