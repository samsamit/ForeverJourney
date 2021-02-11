import axios from "axios"
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";

import API from "../api";
import { store } from "../store";
import { AUTH_USER, SET_ERRORS } from "../store/types";

export const signin = async (iuser: {username: string, password: string}) => {
    await API.post("/signin", iuser)
    .then((res) => {
      store.dispatch({type: AUTH_USER, data: {user: res.data.user, token: res.data.token}})
    })
    .catch((err) => {
      console.log(err.response.data);
      store.dispatch({type: SET_ERRORS, data: err.response.data})
    });
}

export const signup = async (newUser: {username: string, password: string, email: string}) => {
    await API.post("/signup", newUser)
    .then((res) => {
      store.dispatch({type: AUTH_USER, data: {user: res.data.user, token: res.data.token}})
    })
    .catch((err) =>  {
    store.dispatch({type: SET_ERRORS, data: err.response.data});
    console.log(err.response.data)
  });
}

export const validateToken = (tokenFromState: string) => {
  if(!tokenFromState) return false;
  const decodedToken: any = jwtDecode(tokenFromState);
  if (decodedToken.exp * 1000 < Date.now()) {
    console.log("tokenlost");
    return false;
  } else {
    if (axios.defaults.headers.common["Authorization"] !== tokenFromState) {
      axios.defaults.headers.common["Authorization"] = tokenFromState;
    }
    console.log("tokenfound");
    return true;
  }
}