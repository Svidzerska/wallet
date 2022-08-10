import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import "./detailsInfo.scss";

import { getCards, setAddCard } from "../../features/cards/cardsSlice";

import CardComponent from "./card/Card";
import AddCard from "./formAddCard/addCard/AddCard";
import { Card } from "../../interfaces/Card";

const DetailsInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAddCard: boolean = useAppSelector((state) => state.cards.isAddCard);
  const cardsFromServer: Card[] = useAppSelector((state) => state.cards.cardsFromServer);

  useEffect(() => {
    dispatch(getCards());
  }, []);

  useEffect(() => {
    console.log(cardsFromServer);
  }, [cardsFromServer]);

  const addCard = (): void => {
    dispatch(setAddCard(true));
  };

  const cancelAddCard = (): void => {
    dispatch(setAddCard(false));
  };

  const cardsList: JSX.Element[] = cardsFromServer.map((card: Card) => {
    return (
      <CardComponent
        number={card.card_number}
        expire_date={card.expire_date}
        value={card.amount}
        currency={card.currency}
        payment_sys={"Visa"}
        card_type={"debit"}
      />
    );
  });

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
          {cardsList}
        </section>
      )}
    </>
  );
};

export default DetailsInfo;
