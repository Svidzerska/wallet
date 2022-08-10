import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import "./detailsInfo.scss";

import { setAddCard } from "../../features/cards/cardsSlice";

import Card from "./card/Card";
import AddCard from "./formAddCard/addCard/AddCard";

const DetailsInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAddCard: boolean = useAppSelector((state) => state.cards.isAddCard);

  // useEffect(() => {}, []);

  const addCard = (): void => {
    dispatch(setAddCard(true));
  };

  const cancelAddCard = (): void => {
    dispatch(setAddCard(false));
  };

  return (
    <>
      {isAddCard ? (
        <section className="addCard__section">
          <AddCard />
          <button onClick={cancelAddCard}>Скасувати</button>
        </section>
      ) : (
        <section className="detailsInfo__section">
          <button onClick={addCard}>Додати картку</button>
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
      )}
    </>
  );
};

export default DetailsInfo;
