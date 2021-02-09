import { ReducerInput } from "../store"
import { CLEAR_ERRORS, SET_ERRORS } from "../store/types"

export interface IUiState {
    errors: any;
}

const initialState: IUiState = {
    errors: {},
}

export default (state = initialState,  action: ReducerInput) => {
    switch (action.type) {

    case SET_ERRORS:
        return {
            ...state,
            errors: {...action.data}
        }
    case CLEAR_ERRORS:
        return {
            ...state,
            errors: {}
        }

    default:
        return state
    }
}
