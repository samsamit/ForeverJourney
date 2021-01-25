import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//import dataReducer from "./reducers/dataReducer";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import battleReducer from "./reducers/battleReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducers = combineReducers({
  user: userReducer,
  //data: dataReducer,
  UI: uiReducer,
  battle: battleReducer,
});
export type IRootState = ReturnType<typeof reducers>;

const w: any = window as any;
const devtools: any = w.devToolsExtension
  ? w.__REDUX_DEVTOOLS_EXTENSION__()
  : (f: any) => f;
const middleware = applyMiddleware(thunk);
export const store: any = middleware(devtools(createStore))(reducers);
