import { ReducerInput } from "../store"
import { AUTH_USER } from "../store/types"

export interface IUserState {
    loggedIn: boolean;
    userInfo: any;
}

const initialState: IUserState = {
    loggedIn: false,
    userInfo: {}
}

export default (state = initialState,  action: ReducerInput) => {
    switch (action.type) {

    case AUTH_USER:
        return {
            ...state,
            userInfo: action.data,
            loggedIn: true,
        }

    default:
        return state
    }
}
