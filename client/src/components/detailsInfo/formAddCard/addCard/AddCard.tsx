import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import "./addCard.scss";

import { setAddCard } from "../../../../features/cards/cardsSlice";

import { configFormAddCard } from "../configFormAddCard/configFormAddCard";
import FormBuilder from "../../../utilityComponents/formBuilder/FormBuilder";

const AddCard: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(setAddCard(false));
    console.log(111111);
  };

  return (
    <FormBuilder
      config={configFormAddCard}
      formName="Додавання картки"
      formActionName="Додати картку"
      onSubmitToDo={handleSubmit}
    />
  );
};

export default AddCard;
