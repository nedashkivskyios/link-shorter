import {AppReducerActionType} from "./appReducerActionsType";

export type LoadingStatusType = 'idle' | 'success' | 'failed' | 'loading'
export type SeverityStatusType = 'success' | 'error' | 'info'


const initialState: AppInitialStateType = {
  loading: 'idle',
  error: null,
  severity: 'info',
  isOpenSnackbar: false,
  token: '',
  userId: '',
}


export const appReducer = (state = initialState, action: AppReducerActionType): AppInitialStateType => {
  switch (action.type) {
    case "DVK/SET-LOADING": {
      return {
        ...state,
        loading: action.loading,
      }
    }
    case "DVK/SET-APP-ERROR": {
      return {
        ...state,
        error: action.error,
      }
    }
    case "DVK/SET-SEVERITY": {
      return {
        ...state,
        severity: action.severity,
      }
    }
    case "DVK/SET-IS-OPEN-SNACKBAR": {
      return {
        ...state,
        isOpenSnackbar: action.isOpenSnackbar,
      }
    }
    case "DVK/SET-TOKEN": {
      return {
        ...state,
        token: action.token,
      }
    }
    case "DVK/SET-USER-ID": {
      return {
        ...state,
        userId: action.userId,
      }
    }
    case "DVK/APP-LOGOUT": {
      return {
        ...state,
        token: '',
        userId: '',
      }
    }
    default: {
      return state
    }
  }
}

export type AppInitialStateType = {
  loading: LoadingStatusType
  error: null | string
  severity: SeverityStatusType
  isOpenSnackbar: boolean
  token: string
  userId: string
}
export type StringNullType = string | null
