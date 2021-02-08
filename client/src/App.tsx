import React, { useEffect, useState } from "react";
import "./App.css";
import API from "./api";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import login from "./pages/login";
import signup from "./pages/signup";

function App() {
  let history = useHistory();
  const [apimsg, setapimsg] = useState("");

  API.get("/testApi")
    .then((res) => {
      setapimsg(res.data);
    })
    .catch((err) => console.log(err));
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <header className="App-header">Api: {apimsg}</header>
            <p>Toimiihan tämä</p>
            <Link to="/login">You can also login</Link>
            <Link to="/signup">You can also SIGNUP</Link>
          </div>
        </Route>
        <Route exact path="/login" component={login} />
        <Route exact path="/signup" component={signup} />
      </Switch>
    </div>
  );
}

export default App;
