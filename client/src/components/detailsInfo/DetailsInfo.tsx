import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import "./detailsInfo.scss";

import { deleteCard, getCards, setAddCard, setEditingCard } from "../../features/cards/cardsSlice";

import CardComponent from "./card/Card";
import AddCard from "./formAddCard/addCard/AddCard";
import { Card } from "../../interfaces/Card";
import EditCard from "./formAddCard/editCard/EditCard";

const DetailsInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAddCard: boolean = useAppSelector((state) => state.cards.isAddCard);
  const editingCard: Card | null = useAppSelector((state) => state.cards.editingCard);
  const cardsFromServer: Card[] = useAppSelector((state) => state.cards.cardsFromServer);
  const deletedCard: string = useAppSelector((state) => state.cards.deletedCard);

  useEffect(() => {
    console.log(deletedCard);
  }, [deletedCard]);

  useEffect(() => {
    !isAddCard && dispatch(getCards());
  }, [, isAddCard, deletedCard]);

  const addCard = (): void => {
    dispatch(setAddCard(true));
  };

  const cancelAddCard = (): void => {
    dispatch(setAddCard(false));
    dispatch(setEditingCard(null));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(e.currentTarget.id);
    dispatch(deleteCard(e.currentTarget.id));
  };

  const cardsList: JSX.Element[] = cardsFromServer.map((card: Card, index: number) => {
    return (
      <li key={`${card.card_number}${index}`} className="cardElement">
        <CardComponent
          number={card.card_number}
          expire_date={card.exp_date}
          value={card.amount}
          currency={card.currency}
          scheme={card.scheme}
          type={card.type}
        />
        <button onClick={handleDelete} id={`${card.id}`} className="deleteCard">
          Видалити
        </button>
      </li>
    );
  });

  return (
    <>
      {isAddCard ? (
        <section className="addCard__section">
          {!editingCard ? <AddCard /> : <EditCard editingCard={editingCard} />}
          <button onClick={cancelAddCard}>Скасувати</button>
        </section>
      ) : (
        <section className="detailsInfo__section">
          <button onClick={addCard} className="addCardButton">
            Додати картку
          </button>
          <button className="addCardButton">Додати готівку</button>
          <ul className="cardList">{cardsList}</ul>
        </section>
      )}
    </>
  );
};

export default DetailsInfo;
