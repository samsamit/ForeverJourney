import React from "react";
import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme/theme";
import jwtDecode from "jwt-decode";
//Redux
import { Provider, useSelector } from "react-redux";
import { IRootState, store } from "./redux/store";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

//pages
import Home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import axios from "axios";
import noPerm from "./pages/noPerm";
import admin from "./pages/adminPages/admin";
import { UserRole } from "./Types/DatabaseTypes";
import RoleRoute from "./util/RoleRoute";
import { mobileSizeLimit } from "./constants";
import { handleDarkMode } from "./util/handleDarkMode";
import MapMaker from "./components/map/MapMaker/MapMaker";
import BattleArenaTester from "./components/battle/battleTEster/BattleArenaTester";

//axios.defaults.baseURL =
//  "https://europe-west1-forever-journey.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
    console.log("tokenlost");
  } else {
    if (axios.defaults.headers.common["Authorization"] !== token) {
      console.log("tokenfound");
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUserData());
    }
  }
}

function App() {
  handleDarkMode();
  const location = useLocation();
  const showNav =
    location.pathname !== "/login" && location.pathname !== "/signup";
  const loading = useSelector((state: IRootState) => state.UI.loading);

  return (
    <MuiThemeProvider theme={theme}>
      <div className="app">
        {showNav && (
          <div className="navBar">
            <Navbar />
          </div>
        )}

        <div className="content-container">
          {loading ? (
            "SUPER FAST LOADING..."
          ) : (
            <Switch>
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <AuthRoute exact path="/" Icomponent={Home} />
              <Route exact path="/noPerm" component={noPerm} />
              <RoleRoute
                exact
                path="/admin"
                requiredRole={UserRole.admin}
                Icomponent={admin}
              />
              <RoleRoute
                exact
                path="/mapMaker"
                requiredRole={UserRole.admin}
                Icomponent={MapMaker}
              />
              <RoleRoute
                exact
                path="/Battle"
                requiredRole={UserRole.admin}
                Icomponent={BattleArenaTester}
              />
            </Switch>
          )}
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
