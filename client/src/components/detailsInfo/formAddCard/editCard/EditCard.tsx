import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import "./editCard.scss";

import { editCard, saveCard, setAddCard, setEditingCard } from "../../../../features/cards/cardsSlice";

import { configFormAddCard } from "../configFormAddCard/configFormAddCard";
import FormBuilder from "../../../utilityComponents/formBuilder/FormBuilder";
import { Card } from "../../../../interfaces/Card";

interface Props {
  editingCard: Card;
}

const EditCard: React.FC<Props> = ({ editingCard }): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentCard: Card | null = useAppSelector((state) => state.cards.currentCard);

  useEffect(() => {
    console.log(currentCard);
    console.log(editingCard);
  }, [currentCard]);

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

  return (
    <FormBuilder
      config={configFormAddCard}
      formName="Редагування картки"
      formActionName="Зберегти зміни"
      onSubmitToDo={handleSaveEdit}
      autoFill={editingCard}
    />
  );
};

export default EditCard;
