import React, { useEffect, useState } from "react";
import { useAppDispatch } from "./app/hooks";

import "./App.scss";

import { getCards } from "./features/cards/cardsSlice";
import { getCash } from "./features/cash/cashSlice";

import GeneralInfo from "./components/generalInfo/GeneralInfo";
import DetailsInfo from "./components/detailsInfo/DetailsInfo";

const App: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCards());
    dispatch(getCash());
  }, []);

  return (
    <>
      <header className="App-header"> {`All your money here`} </header>
      <main className="App-info">
        <GeneralInfo />
        <DetailsInfo />
      </main>
    </>
  );
};

export default App;
