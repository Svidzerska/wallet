import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { deleteCard, setAddCard, setEditingCard } from "../../features/cards/cardsSlice";
import { getCash, setAddCash, setEditingPocketCurrency } from "../../features/cash/cashSlice";

import { Card } from "../../interfaces/Card";
import { Cash } from "../../interfaces/Cash";

import "./generalInfo.scss";

const GeneralInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const cardsFromServer: Card[] = useAppSelector((state) => state.cards.cardsFromServer);
  const cashFromServer: Cash[] = useAppSelector((state) => state.cash.cashFromServer);

  const [uah, setUah] = useState<number>(0);
  const [usd, setUsd] = useState<number>(0);
  const [eur, setEur] = useState<number>(0);

  const [uahCash, setUahCash] = useState<number>(0);
  const [usdCash, setUsdCash] = useState<number>(0);
  const [eurCash, setEurCash] = useState<number>(0);

  useEffect(() => {
    cashFromServer.map((pocket) => {
      pocket.currency === "UAH" && pocket.amount && setUahCash(+pocket.amount);
      pocket.currency === "USD" && pocket.amount && setUsdCash(+pocket.amount);
      pocket.currency === "EUR" && pocket.amount && setEurCash(+pocket.amount);
    });
  }, [cashFromServer]);

  useEffect(() => {
    dispatch(getCash());
  }, []);

  useEffect(() => {
    console.log(cashFromServer);
  }, [cashFromServer]);

  useEffect(() => {
    const cards = [...cardsFromServer];

    const cardsUAH: number[] = cards.map((card) => {
      if (card.currency === "UAH" && card.amount) {
        return Number(card.amount);
      } else {
        return 0;
      }
    });
    const resultUAH = cardsUAH.reduce((sum, current) => {
      return sum + current;
    }, 0);
    setUah(resultUAH);

    const cardsUSD: number[] = cards.map((card) => {
      if (card.currency === "USD" && card.amount) {
        return Number(card.amount);
      } else {
        return 0;
      }
    });
    const resultUSD = cardsUSD.reduce((sum, current) => {
      return sum + current;
    }, 0);
    setUsd(resultUSD);

    const cardsEUR: number[] = cards.map((card) => {
      if (card.currency === "EUR" && card.amount) {
        return Number(card.amount);
      } else {
        return 0;
      }
    });
    const resultEUR = cardsEUR.reduce((sum, current) => {
      return sum + current;
    }, 0);
    setEur(resultEUR);
  }, [cardsFromServer]);

  const handleEdit = (): void => {
    dispatch(setAddCash(true));
  };

  const handleEditCard = (e: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(setAddCard(true));
    const editingCard = cardsFromServer.find((card) => card.id === e.currentTarget.id);
    console.log(editingCard);
    dispatch(setEditingCard(editingCard!));
    // dispatch(deleteCard(e.currentTarget.id));
  };

  const cardsList: JSX.Element[] = cardsFromServer.map((card: Card) => {
    return (
      <li key={`${card.id}`} className="cardShortInfo">
        <div>
          <p>
            {card.card_number?.substring(0, 4) +
              " " +
              "****" +
              " " +
              "****" +
              " " +
              card.card_number?.substring(15, 19)}
          </p>
          <p>
            {card.amount} {card.currency}
          </p>
        </div>
        <button onClick={handleEditCard} id={`${card.id}`} className="editButton">
          Редагувати
        </button>
      </li>
    );
  });

  const cashPocketAmount = cashFromServer.map((pocket) => {
    return (
      <div key={pocket.currency}>
        <p>
          - {pocket.amount} {pocket.currency}
        </p>
        <button
          className="editButton"
          onClick={() => {
            handleEdit();
            dispatch(setEditingPocketCurrency(pocket!));
          }}
        >
          Редагувати
        </button>
      </div>
    );
  });

  return (
    <section className="generalInfo__section">
      <h3 className="balance">Баланс</h3>
      <div className="money">
        <p>- {uah} UAH</p>
        <p>- {usd} USD</p>
        <p>- {eur} EUR</p>
      </div>
      <section className="cash">
        <h3 className="cashName">Готівка</h3>
        {cashPocketAmount}
      </section>
      <h3 className="cards">Мої Картки</h3>
      <ul>{cardsList}</ul>
    </section>
  );
};

export default GeneralInfo;
