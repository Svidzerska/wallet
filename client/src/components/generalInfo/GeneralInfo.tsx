import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { setAddCard, setCurrentCard, setEditingCard } from "../../features/cards/cardsSlice";
import { setAddCash, setEditingPocket } from "../../features/cash/cashSlice";

import { Card } from "../../interfaces/Card";
import { Cash } from "../../interfaces/Cash";

import "./generalInfo.scss";

const GeneralInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const cardsFromServer: { result: Card[]; message: string | null } = useAppSelector(
    (state) => state.cards.cardsFromServer
  );
  const cashFromServer: { result: Cash[]; message: string | null } = useAppSelector(
    (state) => state.cash.cashFromServer
  );

  const [uniqCurrencies, setUniqCurrencies] = useState<(string | undefined)[]>([]);

  const orderCurrencies = ["UAH", "USD", "EUR"];

  const sum = (cards: Card[], cash: Cash[], currency: string): number => {
    const cardsOneCurrency: number[] = cards.map((card) => {
      if (card.currency === currency && card.amount) {
        return Number(card.amount);
      } else {
        return 0;
      }
    });

    const cardsSum: number = cardsOneCurrency.reduce((sum, current) => {
      return sum + current;
    }, 0);

    const cashOneCurrency: number = Number(cash.find((pocket) => pocket.currency === currency)?.amount);

    return !isNaN(cashOneCurrency) ? cardsSum + cashOneCurrency : cardsSum;
  };

  useEffect(() => {
    const currencies: string[] = [...cardsFromServer.result, ...cashFromServer.result].map(
      (pocket) => pocket.currency!
    );
    const uniqCurrencies = currencies.filter((currency, id) => currencies.indexOf(currency) === id);
    const uniqOrderCurrencies = orderCurrencies.filter((defaultCurrency) => uniqCurrencies.includes(defaultCurrency));
    setUniqCurrencies(uniqOrderCurrencies);
  }, [cardsFromServer, cashFromServer]);

  const handleEdit = (): void => {
    dispatch(setAddCash(true));
  };

  const handleEditCard = (e: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(setAddCard(true));
    const editingCard = cardsFromServer.result.find((card) => card.id === e.currentTarget.id);
    dispatch(setEditingCard(editingCard!));
    dispatch(setCurrentCard(null));
  };

  const cardsList: JSX.Element[] = cardsFromServer.result.map((card: Card) => {
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
          ????????????????????
        </button>
      </li>
    );
  });

  const allMoney: (JSX.Element | null)[] = uniqCurrencies.map((currency) => {
    if (currency) {
      return (
        <p key={currency}>
          - {sum(cardsFromServer.result, cashFromServer.result, currency)} {currency}
        </p>
      );
    } else {
      return null;
    }
  });

  const cashPocketAmount: JSX.Element[] | undefined = cashFromServer.result?.map((pocket, index) => {
    return (
      <div key={pocket.currency}>
        <p>
          <b>{index + 1}.</b> {pocket.amount} {pocket.currency}
        </p>
        <button
          className="editButton"
          onClick={() => {
            handleEdit();
            dispatch(setEditingPocket(pocket!));
          }}
        >
          ????????????????????
        </button>
      </div>
    );
  });

  return (
    <section className="generalInfo__section">
      <h3 className="balance">????????????</h3>
      <div className="money">
        {cashFromServer.message || cardsFromServer.message ? (
          <p>{cashFromServer.message || cardsFromServer.message}</p>
        ) : allMoney.length !== 0 ? (
          allMoney
        ) : (
          <p>???? ???????????? ???????????? ???????????? ???? ???????????????????? ?????? ??????????????</p>
        )}
      </div>
      <section className="cash">
        <h3 className="cashName">??????????????</h3>
        {cashFromServer.message ? (
          <p>{cashFromServer.message}</p>
        ) : cashPocketAmount.length !== 0 ? (
          cashPocketAmount
        ) : (
          <p>???? ???????????? ???????????????????? ?????? ??????????????</p>
        )}
      </section>
      <h3 className="cards">?????? ????????????</h3>
      <ul>
        {cardsFromServer.message ? (
          <p>{cardsFromServer.message}</p>
        ) : cardsList.length !== 0 ? (
          cardsList
        ) : (
          <p>???? ???????????? ???????????? ????????????</p>
        )}
      </ul>
    </section>
  );
};

export default GeneralInfo;
