import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

import "./card.scss";

interface Props {
  number: number;
  expire_date: string;
  value: number;
  currency: string;
  payment_sys: string;
  card_type: string;
}

const Card: React.FC<Props> = ({ number, expire_date, value, currency, payment_sys, card_type }): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <div className={`card ${card_type === "debit" ? "debit" : "credit"}`}>
      <h2>{number}</h2>
      <h3>
        {value} {currency}
      </h3>
      <h3>{expire_date}</h3>
      <h2>{payment_sys}</h2>
      <h5>{card_type}</h5>
    </div>
  );
};

export default Card;
