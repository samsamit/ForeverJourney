import axios from "axios";
import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS } from "../types";
import { getUserData } from "./userActions";

export const createCharacter = (characterInfo) => (
    dispatch: any
  ) => {
    dispatch({ type: LOADING_UI });
    axios
      .post("/character", characterInfo)
      .then(() => {
        dispatch({ type: CLEAR_ERRORS });
        dispatch(getUserData());
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      });
  };