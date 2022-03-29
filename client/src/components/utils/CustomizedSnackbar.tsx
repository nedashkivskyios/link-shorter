import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../bll/store";
import {
  LoadingStatusType,
  SeverityStatusType,
} from "../../bll/appReducer/appReducer";
import { setIsOpenSnackbarStatusAC } from "../../bll/appReducer/appReducerActionCreators";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomizedSnackbar = () => {
  const open = useSelector<RootStateType, boolean>(
    (state) => state.app.isOpenSnackbar
  );
  const severity = useSelector<RootStateType, SeverityStatusType>(
    (state) => state.app.severity
  );
  const loadingStatus = useSelector<RootStateType, LoadingStatusType>(
    (state) => state.app.loading
  );
  const authErrorMessage = useSelector<RootStateType, string | null>(
    (state) => state.auth.error
  );
  const authMessage = useSelector<RootStateType, string>(
    (state) => state.auth.message
  );

  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setIsOpenSnackbarStatusAC({ isOpen: false }));
  };
  const textForSnackbar =
    loadingStatus === "success" ? authMessage : authErrorMessage;

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {textForSnackbar}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
