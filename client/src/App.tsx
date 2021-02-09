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
import { validateToken } from "./actions/userHandling";
import { useSelector } from "react-redux";
import { IRootState } from "./store";
import { useSnackbar } from "notistack";

function App() {
  let history = useHistory();
  let location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const errors = useSelector((state: IRootState) => state.ui.errors);

  useEffect(() => {
    if (errors.error) enqueueSnackbar(errors.error, { variant: "error" });
  }, [errors.error]);

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
