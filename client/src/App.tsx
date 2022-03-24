import React, {useEffect} from 'react';
import {useRouter} from './pages/MainRouter'
import Box from "@mui/material/Box";
import {CustomizedSnackbar} from "./components/utils/CustomizedSnackbar";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./bll/store";
import {LoadingStatusType, StringNullType} from "./bll/appReducer/appReducer";
import {setTokenAC, setUserId} from "./bll/appReducer/appReducerActionCreators";
import {NavBar} from "./components/NavBar";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const lcToken = localStorage.getItem('token')
    const lcUserId = localStorage.getItem('userId')
    if (!!lcToken && !!lcUserId) {
      dispatch(setTokenAC({token: lcToken}))
      dispatch(setUserId({userId: lcUserId}))
    }
  }, [])

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
