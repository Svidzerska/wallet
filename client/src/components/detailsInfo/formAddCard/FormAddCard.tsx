import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { getAddCardInfo, setCurrentCard } from "../../../features/cards/cardsSlice";

import { Card } from "../../../interfaces/Card";
import { Config } from "../../../interfaces/Config";

import FormFormik from "../../utilityComponents/formFormik/FormFormik";
import { FormikValues } from "formik";

interface Props {
  config: Config[];
  formName: string;
  formActionName: string;
  autoFill?: Card;
}

const FormAddCard: React.FC<Props> = ({ config, formName, formActionName, autoFill }): JSX.Element => {
  const dispatch = useAppDispatch();

  const addCardInfo: { scheme: string; type: string } | null = useAppSelector((state) => state.cards.addCardInfo);

  const [currentValues, setCurrentValues] = useState<Card>();

  useEffect(() => {
    if (addCardInfo) {
      dispatch(setCurrentCard({ ...currentValues, ...addCardInfo }));
    }
  }, [addCardInfo, currentValues]);

  const handleSubmit = (values: FormikValues): void => {
    const number = values?.card_number;
    const digit = `${number?.substring(0, 4)}${number?.substring(5, 9)}`;
    dispatch(getAddCardInfo(digit));
    setCurrentValues({ ...values });
  };

  return (
    <FormFormik
      config={config}
      formName={formName}
      formActionName={formActionName}
      onSubmitToDo={handleSubmit}
      options={["UAH", "USD", "EUR"]}
      autoFill={autoFill}
    />
  );
};

export default FormAddCard;
