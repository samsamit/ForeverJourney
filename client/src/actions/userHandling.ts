import axios from "axios"
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";

import API from "../api";
import { store } from "../store";
import { AUTH_USER, SET_ERRORS } from "../store/types";

export const signin = async (iuser: {username: string, password: string}) => {
    await API.post("/signin", iuser)
    .then((res) => {
      saveToken(res.data.token);
      store.dispatch({type: AUTH_USER, data: res.data.user})
    })
    .catch((err) => {
      console.log(err.response.data);
      store.dispatch({type: SET_ERRORS, data: err.response.data})
    });
}

export const signup = async (newUser: {username: string, password: string, email: string}) => {
    await API.post("/signup", newUser)
    .then((res) => {
      saveToken(res.data.token);
      store.dispatch({type: AUTH_USER, data: res.data.user})
    })
    .catch((err) =>  {
    store.dispatch({type: SET_ERRORS, data: err.response.data});
    console.log(err.response.data)
  });
}

const saveToken = (token: string) => {
  localStorage.setItem("token", token);
}

export const getToken = (): string => {
  const token = localStorage.getItem("token");
  if(token) return token;
  else  return "";
 
}
export const validateToken = () => {
  const token = localStorage.getItem("token");
  if(!token?.length) return false;
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    console.log("tokenlost");
    return false;
  } else {
    if (axios.defaults.headers.common["Authorization"] !== token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    console.log("tokenfound");
    return true;
  }
}