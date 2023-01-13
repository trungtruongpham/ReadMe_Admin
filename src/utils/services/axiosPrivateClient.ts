import axios from "axios";

const axiosPrivateClient = axios.create({
  baseURL: "https://readnowapi1.azurewebsites.net/api",
  timeout: 100000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosPrivateClient;
