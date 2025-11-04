import axios from "axios";
import {
  attachAuthToAxios,
  attachRefreshInterceptor,
  getToken,
  setAuthHeader,
} from "../utils/tokenService";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3500";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// attaching req. interceptor for token from local storage
attachAuthToAxios(axiosInstance);

attachAuthToAxios(axiosPrivate);
attachRefreshInterceptor(axiosPrivate, {
  refreshEndpoint: "/auth/refresh",
  onRefreshFail: () => {
    window.location.href = "/login";
  },
});

// test for logging all axiosPrivate requests - REMOVE AFTER DEV
axiosPrivate.interceptors.request.use(
  (config) => {
    // verify header exists
    config.headers = config.headers || {};

    // if no token attached, attach token manually
    const token = localStorage.getItem("accessToken");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "%c[AXIOS REQUEST]",
      "color: cyan;",
      config.method?.toUpperCase(),
      config.url,
      "Authorization:",
      config.headers.Authorization ? "[SET]" : "none"
    );

    return config;
  },
  (error) => Promise.reject(error)
);

// attaching refresh interceptor
attachRefreshInterceptor(axiosPrivate, {
  refreshEndpoint: "/auth/refresh",
  onRefreshFail: () => {
    window.location.href = "/login";
  },
});

axiosPrivate.interceptors.response.use(
  (response) => {
    console.log(
      "%c[AXIOS RESPONSE]",
      "color: green;",
      response.config.url,
      response.status
    );
    return response;
  },
  (error) => {
    console.error(
      "%c[AXIOS ERROR]",
      "color: red;",
      error?.response?.status,
      error?.config?.url,
      error?.response?.data
    );
    return Promise.reject(error);
  }
);

// default header if token is already in local storage
const persistedToken = getToken();
if (persistedToken) {
  setAuthHeader(axiosPrivate, persistedToken);
}

export default axiosInstance;
