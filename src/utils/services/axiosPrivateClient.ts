import axios from "axios";

const axiosPrivateClient = axios.create({
  baseURL: "https://readnowapi1.azurewebsites.net/api",
  timeout: 100000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axios.defaults.headers["Authorization"] =
  "Bearer " + localStorage.getItem("token");

axiosPrivateClient.interceptors.request.use(async (config: any) => {
  // const contentType = config.headers["Content-Type"];
  // if (!contentType) {
  //     config.headers["Content-Type"] = "application/json";
  // }

  config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");

  return config;
});

export default axiosPrivateClient;
