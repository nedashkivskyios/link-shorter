import React from 'react';
import {useDispatch} from "react-redux";
import {logoutTC} from "../bll/authReducer/authReducerThunkCreators";
import {LinksTable} from "./LinksTable";
import Box from "@mui/material/Box";

export const LinksPage = () => {
  const dispatch = useDispatch()
  return (

    <Box component={'div'}>
      <LinksTable />
    </Box>
  );
};
