import React, { useEffect, useState } from "react";
import "./App.scss";

import GeneralInfo from "./components/generalInfo/GeneralInfo";
import DetailsInfo from "./components/detailsInfo/DetailsInfo";

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <header className="App-header">All your money here</header>
      <main className="App-info">
        <GeneralInfo />
        <DetailsInfo />
      </main>
    </>
  );
};

export default App;
