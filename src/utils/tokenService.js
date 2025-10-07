import axios from 'axios';

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// stores token in client browser
export const setToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

// returns token in client browser
export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// delete user token from client browser
export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

// set refresh token
export const setRefreshToken = () => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

// get refresh token
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// delete refresh token
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// clear token storage
export const clearTokens = () => {
  removeToken();
  removeRefreshToken();
};


// axios instance helpers
// interceptor sets authorization header
/**
 * @param {import('axios').AxiosInstance} axiosInstance
 * @returns {Function} function to eject the interceptor
 */

export const attachAuthToAxios = (axiosInstance) => {
  const id = axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`; // adds the auth header in bearer format to the request config
    }
    return config;
  }, (error) => Promise.reject(error));

  return () => axiosInstance.interceptors.request.eject(id);
};

// interceptor refresh if error
/**
 * @param {import('axios').AxiosInstance} axiosInstance
 * @param {Object} options
 * @param {string} options.refreshEndpoint -- ex.) auth/refresh
 * @param {() => void} [options.onRefreshFail] -- callback if refresh fails
 * @returns {Function} function to eject the interceptor
 */

// takes an axiosInstance and an options object - 'refreshEndpoint'  - my backend route to exchange a refresh token for a new one
export const attachRefreshInterceptor = (
  axiosInstance, 
    {refreshEndpoint, onRefreshFail} = {}
  ) => {
  let isRefreshing = false;
  let failedQueue = []; // hold requests that failed with a 401 while refreshis in progress


  // helper to resolve/reject promises in failedQueue
  const processQueue = (error, token = null) => {
    failedQueue.forEach(p => {
      if (error) p.reject(error);
      else p.resolve(token);
    });
    failedQueue = [];
  };

  const id = axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      // check if failed request's URL matches/contains refresh endpoint
      if (
        originalRequest?.url && 
        refreshEndpoint && 
        originalRequest.url.includes(refreshEndpoint)
      ) {
        return Promise.reject(error)
      }

      // only handles requests if a retry hasn't triggered yet
      if (!originalRequest || originalRequest._retry) {
        return Promise.reject(error);
      }
      // attempt refresh again only if error 401
      if (error.response && error.response.status === 401) {
        originalRequest._retry = true;

        // queue until finished refreshing
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({resolve, reject});
          }).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          }).catch((error) => Promise.reject(error));
        }

        isRefreshing = true;
        const refreshToken = getRefreshToken();

        // if no token, no provided refresh enpoint - clear tokens, mark isRefreshing false, reject 
        if (!refreshToken || !refreshEndpoint) {
          clearTokens();
          if (typeof onRefreshFail === 'function') onRefreshFail();
          isRefreshing = false;
          return Promise.reject(error)
        }

        // assuming refresh endpoints will return, new access and fresh tokens
        try {
          const response = await axiosInstance.post(refreshEndpoint, {refreshToken});
          const newAccessToken = response.data?.accessToken ?? response.data?.token;
          const newRefreshToken = response.data?.refreshToken ?? null;

          if (!newAccessToken) {
            throw new Error("No access token returned after refresh response");
          }

          setToken(newAccessToken)
          if (newRefreshToken) setRefreshToken(newRefreshToken);

          processQueue(null, newAccessToken); // resolve queued requests
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // sets auth header to original req. and retries
          return axiosInstance(originalRequest);
        } catch (error) {
          processQueue(error, null);
          clearTokens();
          if (typeof onRefreshFail === 'function') onRefreshFail();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return () => axiosInstance.interceptors.response.eject(id);
};


// set or clean default auth header on axios instance
export const setAuthHeader = (axiosInstance, token) => {
  if (token) {
    axiosInstance.defaults.headers = axiosInstance.defaults.headers ?? {};
    axiosInstance.defaults.headers.common = axiosInstance.defaults.headers.common ?? {};
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    if (axiosInstance.defaults?.headers?.common) {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  }
};
