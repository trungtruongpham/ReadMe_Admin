import axios from "axios";

const axiosPrivateClient = axios.create({
  baseURL: "https://14.225.192.142/api",
  timeout: 100000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axios.defaults.headers["Authorization"] =
  "Bearer " + localStorage.getItem("token");

axiosPrivateClient.interceptors.request.use(async (config: any) => {
  config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");

  return config;
});

export default axiosPrivateClient;
