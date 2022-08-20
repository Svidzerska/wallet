import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import "./editCard.scss";

import { editCard, getCards, setAddCard, setEditingCard } from "../../../../features/cards/cardsSlice";

import { configFormAddCard } from "../configFormAddCard/configFormAddCard";
import { Card } from "../../../../interfaces/Card";

import FormAddCard from "../FormAddCard";

interface Props {
  editingCard: Card;
}

const EditCard: React.FC<Props> = ({ editingCard }): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentCard: Card | null = useAppSelector((state) => state.cards.currentCard);

  useEffect(() => {
    console.log(currentCard);
  }, [currentCard]);

  const handleSaveEdit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(setAddCard(false));
    if (
      currentCard &&
      !Object.keys({ ...currentCard, ...editingCard }).every((key) => currentCard[key] === editingCard[key])
    ) {
      dispatch(editCard({ ...currentCard })).then(() => dispatch(getCards()));
    }
    dispatch(setEditingCard(null));
  };

  return (
    <FormAddCard
      config={configFormAddCard}
      formName="Редагування картки"
      formActionName="Зберегти зміни"
      handleSubmit={handleSaveEdit}
      autoFill={editingCard}
    />
  );
};

export default EditCard;
