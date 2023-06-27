import {
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Route,
} from "react-router-dom";
import TableData from "../components/table";
import User from "../components/user";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import axiosPublicClient from "../utils/services/axiosPublicClient";
import CreateBookForm from "../pages/form/create-book";
import Dashboard from "../pages/home/dashboard";
import Data from "../pages/home/data";
import { AuthLayout } from "../layout/AuthLayout";
import { ProtectedLayout } from "../layout/ProtectedLayout";

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 3000)
  );

const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/home" element={<ProtectedLayout />}>
        <Route path="/home" element={<HomePage></HomePage>}>
          <Route path="/home/dashboard" element={<Dashboard />}></Route>
          <Route path="/home/data" element={<Data />}>
            <Route
              path=":entity"
              element={<TableData></TableData>}
              loader={async (params: any) => {
                const res = await axiosPublicClient.get(
                  `/${params.params.entity}/search?name=&pageNumber=1&pageSize=5`
                );
                if (res.status === 404) {
                  throw new Response("Not Found", { status: 404 });
                }
                return res;
              }}
            ></Route>
          </Route>
          <Route path="/home/users" element={<User />}></Route>
        </Route>
        <Route path="/home/forms" element={<HomePage></HomePage>}>
          <Route
            path="/home/forms/create-book"
            element={<CreateBookForm />}
          ></Route>
        </Route>
      </Route>
    </Route>
  )
);

export default MainRouter;
