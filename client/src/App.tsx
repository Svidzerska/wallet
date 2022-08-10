import React, { useEffect, useState } from "react";
import "./App.scss";

import GeneralInfo from "./components/generalInfo/GeneralInfo";
import DetailsInfo from "./components/detailsInfo/DetailsInfo";

const App: React.FC = (): JSX.Element => {
  // const [response, setResponse] = useState<string>("");

  // useEffect(() => {
  //   callApi()
  //     .then((res) => {
  //       console.log(res.express);
  //       setResponse(res.express);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   console.log(response);
  // }, [response]);

  // const callApi = async () => {
  //   const response = await fetch("/api/cards");
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

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
