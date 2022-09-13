import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import "./detailsInfo.scss";

import { deleteCard, getCards, setAddCard, setCurrentCard, setEditingCard } from "../../features/cards/cardsSlice";
import { setAddCash } from "../../features/cash/cashSlice";

import { Card } from "../../interfaces/Card";

import CardComponent from "./card/Card";
import AddCard from "./formAddCard/addCard/AddCard";
import EditCard from "./formAddCard/editCard/EditCard";
import AddCash from "./formAddCard/addCash/AddCash";

const DetailsInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAddCard: boolean = useAppSelector((state) => state.cards.isAddCard);
  const editingCard: Card | null = useAppSelector((state) => state.cards.editingCard);
  const cardsFromServer: { result: Card[]; message: string | null } = useAppSelector(
    (state) => state.cards.cardsFromServer
  );

  const isAddCash: boolean = useAppSelector((state) => state.cash.isAddCash);

  useEffect(() => {
    console.log(cardsFromServer);
  }, [cardsFromServer]);

  useEffect(() => {
    document.body.style.overflow = isAddCash ? "hidden" : "auto";
  }, [isAddCash]);

  const addCard = (): void => {
    dispatch(setAddCard(true));
    dispatch(setCurrentCard(null));
  };

  const cancelAddCard = (): void => {
    dispatch(setAddCard(false));
    dispatch(setEditingCard(null));
  };

  const addCash = (): void => {
    dispatch(setAddCash(true));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(e.currentTarget.id);
    dispatch(deleteCard(e.currentTarget.id)).then(() => dispatch(getCards()));
  };

  const cardsList: JSX.Element[] = cardsFromServer.result.map((card: Card, index: number) => {
    return (
      <li key={`${card.id}`} className="cardElement">
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
          <button onClick={addCash} className="addCardButton">
            Додати готівку
          </button>
          <ul className="cardList">
            {cardsFromServer.message ? (
              <p>{cardsFromServer.message}</p>
            ) : cardsList.length !== 0 ? (
              cardsList
            ) : (
              <p>Не додано жодної картки</p>
            )}
          </ul>
        </section>
      )}
      {isAddCash && <AddCash />}
    </>
  );
};

export default DetailsInfo;
