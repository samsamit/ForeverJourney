import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import userReducer from "../reducers/userReducer";
import thunk from "redux-thunk";
export interface ReducerInput{
    type: string,
    data: any,
}

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

  const reducers = combineReducers({
    user: userReducer,

  });

  export type IRootState = ReturnType<typeof reducers>;

  const w: any = window as any;
const devtools: any = w.devToolsExtension
  ? w.__REDUX_DEVTOOLS_EXTENSION__()
  : (f: any) => f;
const middleware = applyMiddleware(thunk);
export const store: any = middleware(devtools(createStore))(reducers);