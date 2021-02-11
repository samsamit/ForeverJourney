import { IUser } from "../interfaces/user"
import { ReducerInput } from "../store"
import { AUTH_USER, LOGOUT_USER } from "../store/types"

export interface IUserState {
    loggedIn: boolean;
    token: string;
    userInfo?: IUser;
}

const initialState: IUserState = {
    loggedIn: false,
    userInfo: undefined,
    token: ''
}

export default (state: IUserState = initialState,  action: ReducerInput): IUserState => {
    switch (action.type) {

    case AUTH_USER:
        return {
            userInfo: action.data.user,
            token: action.data.token,
            loggedIn: true,
        }
    
    case LOGOUT_USER:
        return initialState

    default:
        return state
    }
}