import React, { useEffect, useState } from "react";
import "./App.css";

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
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
};

export default App;
