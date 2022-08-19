import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { deleteCard, setAddCard, setEditingCard } from "../../features/cards/cardsSlice";
import { getCash, setAddCash, setEditingPocket } from "../../features/cash/cashSlice";

import { Card } from "../../interfaces/Card";
import { Cash } from "../../interfaces/Cash";

import "./generalInfo.scss";

const GeneralInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const cardsFromServer: Card[] = useAppSelector((state) => state.cards.cardsFromServer);
  const cashFromServer: Cash[] = useAppSelector((state) => state.cash.cashFromServer);

  const [uniqCurrencies, setUniqCurrencies] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    console.log(cashFromServer);
  }, [cashFromServer]);

  const sum = (cards: Card[], currency: string): number => {
    const cardsOneCurrency: number[] = cards.map((card) => {
      if (card.currency === currency && card.amount) {
        return Number(card.amount);
      } else {
        return 0;
      }
    });
    const result = cardsOneCurrency.reduce((sum, current) => {
      return sum + current;
    }, 0);

    return result;
  };

  useEffect(() => {
    const cards = [...cardsFromServer];

    const currencies: (string | undefined)[] = cards.map((card) => {
      return card.currency && card.currency;
    });
    const uniqCurrencies = currencies.filter((currency, id) => currencies.indexOf(currency) === id);
    setUniqCurrencies(uniqCurrencies);
  }, [cardsFromServer]);

  const handleEdit = (): void => {
    dispatch(setAddCash(true));
  };

  const handleEditCard = (e: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(setAddCard(true));
    const editingCard = cardsFromServer.find((card) => card.id === e.currentTarget.id);
    console.log(editingCard);
    dispatch(setEditingCard(editingCard!));
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

  const allMoney: JSX.Element[] = uniqCurrencies.map((currency) => {
    if (currency) {
      return (
        <p key={currency}>
          - {sum(cardsFromServer, currency)} {currency}
        </p>
      );
    } else {
      return <></>;
    }
  });

  const cashPocketAmount: JSX.Element[] = cashFromServer.map((pocket) => {
    return (
      <div key={pocket.currency}>
        <p>
          - {pocket.amount} {pocket.currency}
        </p>
        <button
          className="editButton"
          onClick={() => {
            handleEdit();
            dispatch(setEditingPocket(pocket!));
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
      <div className="money">{allMoney}</div>
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
