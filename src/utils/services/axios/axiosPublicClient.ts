import axios from "axios";

const axiosPublicClient = axios.create({
    baseURL: "http://14.225.192.142/api",
    timeout: 100000,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
});

axiosPublicClient.interceptors.request.use(async (config: any) => {
    const contentType = config.headers["Content-Type"];
    if (!contentType) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

export default axiosPublicClient;