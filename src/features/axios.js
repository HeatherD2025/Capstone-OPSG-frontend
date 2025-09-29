import axios from "axios";
import { attachAuthToAxios, attachRefreshInterceptor, getToken, setAuthHeader } from "../utils/tokenService";
import { init } from "@emailjs/browser";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3500';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// attaching req. interceptor for token from local storage
attachAuthToAxios(axiosInstance);
attachAuthToAxios(axiosPrivate);

// attaching refresh interceptor
attachRefreshInterceptor(axiosPrivate, {
    refreshEndpoint: "/auth/refresh",
    onRefreshFail: () => {
        window.location.href = "/login";
    },
});

// default header if token is already in local storage
const initialToken = getToken();
if (initialToken) {
    setAuthHeader(axiosPrivate, initialToken);
}

export default axiosInstance;