import axios from "axios";
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_USERCHARACTERS,
} from "../types";

export const loginUser = (userData: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const signupUser = (newUserData: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = () => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  console.log("Loading user");
  axios
    .get("/user")
    .then((res) => {
      console.log("user loaded");
      dispatch(getUserCharacters());
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch({ type: SET_AUTHENTICATED });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_UNAUTHENTICATED,
      });
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const getUserCharacters = () => (dispatch) => {
  axios
    .get("/characters")
    .then((res) => {
      dispatch({ type: SET_USERCHARACTERS, payload: res.data });
    })
    .catch((err) => {
      console.log("Error fetching user characters", err);
    });
};
