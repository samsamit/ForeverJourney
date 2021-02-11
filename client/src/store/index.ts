import { Action, applyMiddleware, combineReducers, compose, createStore, Dispatch, MiddlewareAPI } from "redux";
import userReducer from "../reducers/userReducer";
import thunk from "redux-thunk";
import uiReducer from "../reducers/uiReducer";
import storage from "redux-persist/lib/storage";
import {createTransform} from "redux-persist";
import localForage from 'localforage';
import {persistReducer} from "redux-persist";

const w: any = window as any;
const devtools: any = w.devToolsExtension
  ? w.__REDUX_DEVTOOLS_EXTENSION__()
  : (f: any) => f;
const middleware = applyMiddleware(thunk);
export interface ReducerInput{
    type: string,
    data: any,
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const persistConfig = {
  key: 'root',
  storage: localForage,
};

const reducers = combineReducers({
  user: userReducer,
  ui: uiReducer,
});
export type IRootState = ReturnType<typeof reducers>;
const persisted = persistReducer(persistConfig, reducers);


export const store: any = middleware(devtools(createStore))(persisted);