const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/* Local storage helpers */

export const setToken = (token) => {
  if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const removeToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const setRefreshToken = (token) => {
  if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const removeRefreshToken = () =>
  localStorage.removeItem(REFRESH_TOKEN_KEY);


/* Axios */

/**
 * Adds Authorization header to each request automatically.
 * @param {import('axios').AxiosInstance} axiosInstance
 * @returns {Function} function to eject the interceptor
 */

export const attachAuthToAxios = (axiosInstance) => {
  const id = axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return () => axiosInstance.interceptors.request.eject(id);
};

/**
 * Automatically refreshes access token
 * @param {import('axios').AxiosInstance} axiosInstance
 * @param {Object} options
 * @param {string} options.refreshEndpoint
 * @param {Function} [options.onRefreshFail]
 * @returns {Function} eject function for the interceptor
 */
export const attachRefreshInterceptor = (
  axiosInstance,
  { refreshEndpoint, onRefreshFail } = {}
) => {
  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) =>
      error ? reject(error) : resolve(token)
    );
    failedQueue = [];
  };

  const id = axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest || originalRequest._retry)
        return Promise.reject(error);

      // don't retry refresh calls
      if (originalRequest.url.includes(refreshEndpoint))
        return Promise.reject(error);

      // Only act on 401 errors
      if (error.response?.status === 401) {
        originalRequest._retry = true;

        // Queue the request if another refresh is in progress
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;
        const refreshToken = getRefreshToken();

        if (!refreshToken || !refreshEndpoint) {
          clearTokens();
          if (typeof onRefreshFail === "function") onRefreshFail();
          isRefreshing = false;
          return Promise.reject(error);
        }

        try {
          const response = await axiosInstance.post(refreshEndpoint, {
            refreshToken,
          });

          const newAccessToken =
            response.data?.accessToken || response.data?.token;
          const newRefreshToken = response.data?.refreshToken;

          if (!newAccessToken)
            throw new Error("No access token returned in refresh response");

          setToken(newAccessToken);
          if (newRefreshToken) setRefreshToken(newRefreshToken);

          processQueue(null, newAccessToken);

          // retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          processQueue(err, null);
          clearTokens();
          if (typeof onRefreshFail === "function") onRefreshFail();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return () => axiosInstance.interceptors.response.eject(id);
};

/**
 * Manually set or remove authorization header.
 * @param {import('axios').AxiosInstance} axiosInstance
 * @param {string|null} token
 */
export const setAuthHeader = (axiosInstance, token) => {
  axiosInstance.defaults.headers = axiosInstance.defaults.headers ?? {};
  axiosInstance.defaults.headers.common =
    axiosInstance.defaults.headers.common ?? {};

  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};
