import React, { useState } from "react";
import "./App.css";
import API from "./api";

function App() {
  const [apimsg, setapimsg] = useState("");

  API.get("/testApi")
    .then((res) => {
      setapimsg(res.data);
    })
    .catch((err) => console.log(err));

  return (
    <div className="App">
      <header className="App-header">Api: {apimsg}</header>
      <p>Toimiihan tämä</p>
    </div>
  );
}

export default App;
