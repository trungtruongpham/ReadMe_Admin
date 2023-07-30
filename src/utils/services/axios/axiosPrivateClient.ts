import axios from "axios";
import axiosPublicClient from "./axiosPublicClient";

const axiosPrivateClient = axios.create({
  baseURL: "http://14.225.192.142/api",
  timeout: 100000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosPrivateClient.interceptors.request.use(async (config: any) => {
  const user = JSON.parse(localStorage.getItem("user") || "");

  if (user) {
    config.headers["Authorization"] = "Bearer " + user.token;
  }

  return config;
});

axiosPrivateClient.interceptors.response.use(
  async (response: any) => {
    return response;
  },
  async function (error: any) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const user = JSON.parse(localStorage.getItem("user") || "");
      const access_token = refreshAccessToken(user);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axiosPrivateClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

function refreshAccessToken(user: any) {
  axiosPublicClient
    .post("/auth/refresh-token", {
      accessToken: user.token,
      refreshToken: user.refreshToken,
    })
    .then((res: any) => {
      if (res) {
        return res;
      }
    });

  return null;
}

export default axiosPrivateClient;
