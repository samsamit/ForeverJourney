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
import Signin from "./pages/signin";
import signup from "./pages/signup";
import { getToken, validateToken } from "./actions/userHandling";

function App() {
  let history = useHistory();
  let location = useLocation();
  //Checks localstorage fot token and handles
  if (validateToken()) {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      history.push("/");
      console.log("validata success!");
    }
  } else {
    if (location.pathname !== "/signup" && location.pathname !== "/signin") {
      history.push("/signin");
      console.log("validata not success!");
    }
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <header className="App-header">
              Olet authentikoitunut oikein!
            </header>
            <p>Toimiihan tämä</p>
            <Link to="/signin">You can also login</Link>
            <Link to="/signup">You can also SIGNUP</Link>
          </div>
        </Route>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={signup} />
      </Switch>
    </div>
  );
}

export default App;
