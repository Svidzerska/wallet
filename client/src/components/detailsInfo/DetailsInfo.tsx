import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import "./detailsInfo.scss";

import Card from "./card/Card";

const DetailsInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <section className="detailsInfo__section">
      <button>Додати картку</button>
      <button>Додати готівку</button>
      <Card
        number={4988438843884305}
        expire_date={"03/2030"}
        value={100}
        currency={"UAH"}
        payment_sys={"Visa"}
        card_type={"debit"}
      />
      <Card
        number={4988438843884305}
        expire_date={"03/2030"}
        value={258.36}
        currency={"USD"}
        payment_sys={"Visa"}
        card_type={"credit"}
      />
    </section>
  );
};

export default DetailsInfo;
