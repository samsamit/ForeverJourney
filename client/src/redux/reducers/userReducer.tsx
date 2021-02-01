import _ from "lodash";
import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_USERCHARACTERS,
  UserState,
} from "../types";

const initialState: UserState = {
  authenticated: false,
  loading: false,
  userData: {
    characters: null,
    credentials: null,
    party: [],
  },
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        loading: false,
      };
    case SET_UNAUTHENTICATED:
      return state;
    case SET_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          credentials: _.pickBy(
            action.payload,
            (value, key) => key !== "party"
          ),
          party: action.payload.party,
        },
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    case SET_USERCHARACTERS:
      return {
        ...state,
        userData: {
          ...state.userData,
          characters: [...action.payload],
        },
      };

    default:
      return state;
  }
}
