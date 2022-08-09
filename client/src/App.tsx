import React, { useEffect, useState } from "react";
import "./App.scss";

import AsideInfo from "./components/AsideInfo/AsideInfo";
import MainInfo from "./components/MainInfo/MainInfo";

const App: React.FC = (): JSX.Element => {
  const [response, setResponse] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [responseToPost, setResponseToPost] = useState<string>("");

  useEffect(() => {
    callApi()
      .then((res) => setResponse(res.express))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);

  const callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  useEffect(() => {
    console.log(post);
  }, [post]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: post }),
    });
    const body = await response.text();
    console.log(body);
    setResponseToPost(body);
  };

  return (
    <>
      <header className="App-header">All your money here</header>
      <section className="App-info">
        <AsideInfo />
        <MainInfo />
      </section>
      <p>{response}</p>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input type="text" value={post} onChange={(e) => setPost(e.target.value)} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{responseToPost}</p>
    </>
  );
};

export default App;
