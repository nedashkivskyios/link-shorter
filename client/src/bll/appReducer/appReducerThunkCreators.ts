import { Dispatch } from "redux";
import { authAPI } from "../../dal/authAPI";
import { setAuthErrorsAC } from "../authReducer/authReducerActionCreators";
import {
  appLogoutAC,
  setIsOpenSnackbarStatusAC,
  setLoadingAC,
  setSeverityAC,
  setTokenAC,
  setUserId,
} from "./appReducerActionCreators";

export const checkAutorizationTC = (params: {
  token: string;
  userId: string;
}) => (dispatch: Dispatch) => {
  dispatch(setLoadingAC({ loading: "loading" }));

  authAPI
    .check({ token: params.token, userId: params.userId })
    .then((res) => {
      dispatch(setTokenAC({ token: res.data.token }));
      dispatch(setUserId({ userId: res.data.userId }));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      dispatch(setLoadingAC({ loading: "success" }));
    })
    .catch((e) => {
      if (e.response.status === 401) {
        dispatch(setAuthErrorsAC({ error: e.response.data.message }));
        dispatch(setLoadingAC({ loading: "failed" }));
        dispatch(setSeverityAC({ severity: "error" }));
        dispatch(setIsOpenSnackbarStatusAC({ isOpen: true }));
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        dispatch(appLogoutAC());
      }
      if (e.response.status === 500) {
        dispatch(setAuthErrorsAC({ error: `${e.response.data.errors}` }));
        dispatch(setLoadingAC({ loading: "failed" }));
        dispatch(setSeverityAC({ severity: "error" }));
        dispatch(setIsOpenSnackbarStatusAC({ isOpen: true }));
      }
    });
};
