import axios from "axios";

const axiosPrivateClient = axios.create({
  baseURL: "http://14.225.192.142/api",
  timeout: 100000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosPrivateClient.interceptors.request.use(async (config: any) => {
  console.log(localStorage.getItem("user"));
  const user = JSON.parse(localStorage.getItem("user") || "");
  config.headers["Authorization"] = "Bearer " + user.token;

  return config;
});

export default axiosPrivateClient;
