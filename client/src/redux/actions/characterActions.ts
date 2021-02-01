import axios from "axios";
import _ from "lodash";
import { useSelector } from "react-redux";
import { maxPartySize } from "../../constants";
import { Character } from "../../Types/Character/characterTypes";
import { IRootState } from "../store";
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

  export const addCharacterToParty = (char: Character, currentParty: Array<Character> = []) => (dispatch) =>{
    if(_.size(currentParty) >= maxPartySize){
      dispatch({
        type: SET_ERRORS,
        payload: {error: "Party already full"},
      });
    }else{
      const newParty = {
        party: {...currentParty, [char.name]: char}
      }
      console.log(newParty);
      dispatch({ type: LOADING_UI });
      axios
      .post("/user", newParty)
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
    }
  }

  export const removeFromParty = (Ichar: Character, currentParty: Array<Character> = []) => (dispatch) => {
    const newParty = _.omit(currentParty, Ichar.name);

    console.log(newParty);
    dispatch({ type: LOADING_UI });
    axios
    .post("/user", {party: newParty})
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
  }