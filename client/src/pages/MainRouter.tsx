import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {LinksPage} from "../components/LinksPage";
import {CreatePage} from "../components/CreatePage";
import {DetailPage} from "../components/DetailPage";
import {AuthPage} from "../components/AuthPage";
import {RegisterPage} from "../components/RegisterPage";
import {NavBar} from "../components/NavBar";

export const useRouter = (isAutenticate: boolean) => {
  if (isAutenticate) {
    return (
      <Routes>
        <Route path={'/links'} element={<LinksPage/>}/>
        <Route path={'/create'} element={<CreatePage/>}/>
        <Route path={'/detail/:id'} element={<DetailPage/>}/>
        <Route path={'*'} element={<Navigate to={'links'}/>}/>
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path={'/'} element={<AuthPage/>}/>
      <Route path={'/register'} element={<RegisterPage/>}/>
      <Route path={'*'} element={<Navigate to={'/'}/>}/>
    </Routes>
  )
};
