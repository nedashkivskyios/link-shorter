import {AuthReducerActionType} from "./authReducerActionsType";

export type AuthErrorsResponseType = {
    location: string
    param: string
    msg: string
    value: string
}
type InitialStateType = {
    message: string
    error: null | string
}

const initialState: InitialStateType = {
    message: '',
    error: null
}


export const authReducer = (state = initialState, action: AuthReducerActionType): InitialStateType => {
    switch (action.type) {
        case "DVK/SET-AUTH-MESSAGE": {
            return {
                ...state,
                message: action.message
            }
        }
        case "DVK/SET-AUTH-ERRORS": {
            return {
                ...state,
                error: action.error
            }
        }
        default: {
            return state
        }
    }
}
