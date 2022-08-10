import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import "./addCard.scss";

import { getAddCardInfo, getCards, saveCard, setAddCard } from "../../../../features/cards/cardsSlice";

import { configFormAddCard } from "../configFormAddCard/configFormAddCard";
import FormBuilder from "../../../utilityComponents/formBuilder/FormBuilder";
import { Card } from "../../../../interfaces/Card";

const AddCard: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [card, setCard] = useState<Card>();

  useEffect(() => {
    dispatch(getCards());
  }, [card]);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(setAddCard(false));
    console.log(111111);
    const digit = `${card?.card_number.substring(0, 4)}${card?.card_number.substring(5, 9)}`;
    dispatch(getAddCardInfo(digit));

    //here add additional information
    card && dispatch(saveCard(card));
  };

  const getCard = (card: Card) => {
    return setCard(card);
  };

  return (
    <FormBuilder
      config={configFormAddCard}
      formName="Додавання картки"
      formActionName="Додати картку"
      onSubmitToDo={handleSubmit}
      getCard={getCard}
    />
  );
};

export default AddCard;
