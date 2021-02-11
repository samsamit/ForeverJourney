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
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { validateToken } from "./actions/userHandling";
import { useSelector } from "react-redux";
import { IRootState } from "./store";
import { useSnackbar } from "notistack";

function App() {
  let history = useHistory();
  let location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const errors = useSelector((state: IRootState) => state.ui.errors);
  const token = useSelector((state: IRootState) => state.user.token);
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    if (errors.error) enqueueSnackbar(errors.error, { variant: "error" });
  }, [errors.error]);

  //Checks localstorage fot token and handles
  if (validateToken(token)) {
    if (!validate) {
      history.push("/");
      console.log("validate success!");
      setValidate(true);
    }
  } else {
    if (validate) {
      setValidate(false);
      history.push("/signin");
      console.log("validate not success!");
    }
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
