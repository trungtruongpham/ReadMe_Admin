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
import axiosPublicClient from "../utils/services/axios/axiosPublicClient";
import CreateBookForm from "../pages/form/create-book";
import Dashboard from "../pages/home/dashboard";
import Data from "../pages/home/data";
import { AuthLayout } from "../layout/AuthLayout";
import { ProtectedLayout } from "../layout/ProtectedLayout";
import CreateAuthorForm from "../pages/form/create-author";
import CreateCategoryForm from "../pages/form/create-category";
import CreateChapterForm from "../pages/form/create-chapter";
import UploadImageForm from "../pages/form/upload-image";
import UploadMusicForm from "../pages/form/upload-music";
import ErrorPage from "../pages/error";
import axiosPrivateClient from "../utils/services/axios/axiosPrivateClient";

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
      errorElement={<ErrorPage />}
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
                const res = await axiosPrivateClient.get(
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
          <Route
            path="/home/forms/create-chapter"
            element={<CreateChapterForm />}
          ></Route>
          <Route
            path="/home/forms/create-author"
            element={<CreateAuthorForm />}
          ></Route>
          <Route
            path="/home/forms/create-category"
            element={<CreateCategoryForm />}
          ></Route>
          <Route
            path="/home/forms/upload-music"
            element={<UploadMusicForm />}
          ></Route>
          <Route
            path="/home/forms/upload-image"
            element={<UploadImageForm />}
          ></Route>
        </Route>
      </Route>
    </Route>
  )
);

export default MainRouter;
