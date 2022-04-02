import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LinksPage } from "../components/LinksPage";
import { DetailPage } from "../components/DetailPage";
import { AuthPage } from "../components/AuthPage";
import { RegisterPage } from "../components/RegisterPage";
import Spotify from "../components/Spotify/Spotify";
import {useSelector} from "react-redux";
import {NavBar} from "../components/NavBar";
import {RootStateType} from "../bll/store";

export const MainRouter = () => {
  const token = useSelector<RootStateType, string>((state) => state.app.token);

  if (!!token) {
    return (
      <>
        <NavBar />
        <Routes>
          <Route path={"/links"} element={<LinksPage />} />
          <Route path={"/detail/:id"} element={<DetailPage />} />
          <Route path={"*"} element={<Navigate to={"links"} />} />
          <Route path={"spotify"} element={<Spotify />} />
        </Routes>
      </>
    );
  }
  return (
    <Routes>
      <Route path={"/"} element={<AuthPage />} />
      <Route path={"/register"} element={<RegisterPage />} />
      <Route path={"*"} element={<Navigate to={"/"} />} />
    </Routes>
  );
};
