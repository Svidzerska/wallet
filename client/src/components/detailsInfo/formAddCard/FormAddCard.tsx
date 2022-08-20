import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { getAddCardInfo, setCurrentCard } from "../../../features/cards/cardsSlice";

import FormBuilder from "../../utilityComponents/formBuilder/FormBuilder";
import { Card } from "../../../interfaces/Card";

interface Props {
  config: any;
  handleSubmit: Function;
  formName: string;
  formActionName: string;
  autoFill?: Card;
}

const FormAddCard: React.FC<Props> = ({ config, handleSubmit, formName, formActionName, autoFill }): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentCard: Card | null = useAppSelector((state) => state.cards.currentCard);
  const addCardInfo: { scheme: string; type: string } = useAppSelector((state) => state.cards.addCardInfo);

  const [currentValues, setCurrentValues] = useState<Card>();

  useEffect(() => {
    dispatch(setCurrentCard({ ...currentValues, ...addCardInfo }));
  }, [addCardInfo, currentValues]);

  useEffect(() => {
    const number = currentValues?.card_number;
    const digit = `${number?.substring(0, 4)}${number?.substring(5, 9)}`;
    number && number.match(/\d+/g)?.join("").length === 16 && dispatch(getAddCardInfo(digit));
  }, [currentValues?.card_number]);

  const getAditionInfoForCard = (values: Card): void => {
    setCurrentValues({ ...values });
  };

  return (
    <FormBuilder
      config={config}
      formName={formName}
      formActionName={formActionName}
      onSubmitToDo={handleSubmit}
      processInputValues={getAditionInfoForCard}
      autoFill={autoFill}
    />
  );
};

export default FormAddCard;
