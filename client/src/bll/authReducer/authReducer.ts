import {AuthReducerActionType} from "./authReducerActionsType";

export type AuthErrorsResponseType = {
    location: string
    param: string
    msg: string
    value: string
}
export type AuthInitialStateType = {
    message: string
    error: null | string
}

const initialState: AuthInitialStateType = {
    message: '',
    error: null
}


export const authReducer = (state = initialState, action: AuthReducerActionType): AuthInitialStateType => {
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
