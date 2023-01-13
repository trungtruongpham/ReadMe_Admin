import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import LoginRoute from "./loginRoute";

export default function Root() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
      </Routes>
    </>
  );
}
