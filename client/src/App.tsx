import React, {useEffect} from 'react';
import {useRouter} from './pages/MainRouter'
import Box from "@mui/material/Box";
import {CustomizedSnackbar} from "./components/utils/CustomizedSnackbar";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./bll/store";
import {LoadingStatusType} from "./bll/appReducer/appReducer";
import {NavBar} from "./components/NavBar";
import {checkAutorizationTC} from "./bll/appReducer/appReducerThunkCreators";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (!!token && !!userId) {
      dispatch(checkAutorizationTC({token, userId}))
    }
  }, [dispatch])

  const token = useSelector<RootStateType, string>(state => state.app.token)
  const isAutenticated = !!token
  const router = useRouter(isAutenticated)
  const loadingStatus = useSelector<RootStateType, LoadingStatusType>(state => state.app.loading)

  return (
    <Box component={'div'}>
      {isAutenticated && <NavBar/>}
      {loadingStatus === 'loading' && <LinearProgress color="inherit"/>}
      {router}
      <CustomizedSnackbar/>
    </Box>
  );
}

export default App;
