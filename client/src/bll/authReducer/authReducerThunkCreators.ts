import {Dispatch} from "redux";
import {authAPI, LoginRequestType, RegisterRequestType} from "../../dal/authAPI";
import {
  appLogoutAC,
  setIsOpenSnackbarStatusAC,
  setLoadingAC,
  setSeverityAC,
  setTokenAC, setUserId,
} from "../appReducer/appReducerActionCreators";
import {setAuthErrorsAC, setAuthMessageAC} from "./authReducerActionCreators";

export const registerTC = (payload: RegisterRequestType) => (dispatch: Dispatch) => {
  dispatch(setLoadingAC({loading: 'loading'}))

  authAPI.register(payload)
    .then(res => {
      dispatch(setAuthMessageAC({message: res.data.message}))
      dispatch(setIsOpenSnackbarStatusAC({isOpen: true}))
      dispatch(setSeverityAC({severity: 'success'}))
      dispatch(setLoadingAC({loading: 'success'}))
    })
    .catch(e => {
      if (e.response.status === 400) {
        dispatch(setAuthErrorsAC({error: e.response.data.message}))
        dispatch(setLoadingAC({loading: 'failed'}))
        dispatch(setSeverityAC({severity: 'error'}))
        dispatch(setIsOpenSnackbarStatusAC({isOpen: true}))
      }
      if (e.response.status === 422) {
        dispatch(setAuthErrorsAC({error: `${e.response.data.message} ${e.response.data.errors[0].msg}`}))
        dispatch(setLoadingAC({loading: 'failed'}))
        dispatch(setSeverityAC({severity: 'error'}))
        dispatch(setIsOpenSnackbarStatusAC({isOpen: true}))
      }
      if (e.response.status === 500) {
        dispatch(setAuthErrorsAC({error: `${e.response.data.errors}`}))
        dispatch(setLoadingAC({loading: 'failed'}))
        dispatch(setSeverityAC({severity: 'error'}))
        dispatch(setIsOpenSnackbarStatusAC({isOpen: true}))
      }
    })
}
export const loginTC = (payload: LoginRequestType) => (dispatch: Dispatch) => {
  dispatch(setLoadingAC({loading: 'loading'}))

  authAPI.login(payload)
    .then(res => {
      dispatch(setTokenAC({token: res.data.token}))
      dispatch(setUserId({userId: res.data.userId}))
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.userId)
      dispatch(setLoadingAC({loading: 'success'}))
    })
    .catch(e => {
      if (e.response.status === 400) {
        dispatch(setAuthErrorsAC({error: e.response.data.message}))
        dispatch(setLoadingAC({loading: 'failed'}))
        dispatch(setSeverityAC({severity: 'error'}))
        dispatch(setIsOpenSnackbarStatusAC({isOpen: true}))
      }
      if (e.response.status === 422) {
        dispatch(setAuthErrorsAC({error: `${e.response.data.message} ${e.response.data.errors[0].msg}`}))
        dispatch(setLoadingAC({loading: 'failed'}))
        dispatch(setSeverityAC({severity: 'error'}))
        dispatch(setIsOpenSnackbarStatusAC({isOpen: true}))
      }
      if (e.response.status === 500) {
        dispatch(setAuthErrorsAC({error: `${e.response.data.errors}`}))
        dispatch(setLoadingAC({loading: 'failed'}))
        dispatch(setSeverityAC({severity: 'error'}))
        dispatch(setIsOpenSnackbarStatusAC({isOpen: true}))
      }
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  dispatch(appLogoutAC())
}
