import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "../components/dashboard";
import Data from "../components/data";
import TableData from "../components/table";
import User from "../components/user";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import axiosPublicClient from "../utils/services/axiosPublicClient";

const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/home" element={<HomePage></HomePage>}>
        <Route path="/home/dashboard" element={<Dashboard />}></Route>
        <Route path="/home/data" element={<Data />}>
          <Route
            path=":entity"
            element={<TableData></TableData>}
            loader={(params: any) => {
              return axiosPublicClient
                .get(`/${params.params.entity}/`)
                .then((res) => {
                  if (res.status === 404) {
                    throw new Response("Not Found", { status: 404 });
                  }

                  return res;
                });
            }}
          ></Route>
        </Route>
        <Route path="/home/users" element={<User />}></Route>
      </Route>
    </Route>
  )
);

export default MainRouter;
