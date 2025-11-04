// const ACCESS_TOKEN_KEY = "accessToken";
// const REFRESH_TOKEN_KEY = "refreshToken";

// // stores token in client browser
// export const setToken = (token) => {
//   localStorage.setItem(ACCESS_TOKEN_KEY, token);
// };

// // returns token in client browser
// export const getToken = () => {
//   return localStorage.getItem(ACCESS_TOKEN_KEY);
// };

// // delete user token from client browser
// export const removeToken = () => {
//   localStorage.removeItem(ACCESS_TOKEN_KEY);
// };

// // set refresh token
// export const setRefreshToken = (token) => {
//   localStorage.setItem(REFRESH_TOKEN_KEY, token);
// };

// // get refresh token
// export const getRefreshToken = () => {
//   return localStorage.getItem(REFRESH_TOKEN_KEY);
// };

// // delete refresh token
// export const removeRefreshToken = () => {
//   localStorage.removeItem(REFRESH_TOKEN_KEY);
// };

// // clear token storage
// export const clearTokens = () => {
//   removeToken();
//   removeRefreshToken();
// };

// // axios instance helpers
// // interceptor sets authorization header
// /**
//  * @param {import('axios').AxiosInstance} axiosInstance
//  * @returns {Function} function to eject the interceptor
//  */

// export const attachAuthToAxios = (axiosInstance) => {
//   const id = axiosInstance.interceptors.request.use(
//     (config) => {
//       const token = getToken();
//       if (token) {
//         config.headers = config.headers ?? {};
//         config.headers.Authorization = `Bearer ${token}`; // adds the auth header in bearer format to the request config
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );
//   return () => axiosInstance.interceptors.request.eject(id);
// };

// // interceptor refresh if error
// /**
//  * @param {import('axios').AxiosInstance} axiosInstance
//  * @param {Object} options
//  * @param {string} options.refreshEndpoint -- ex.) auth/refresh
//  * @param {() => void} [options.onRefreshFail] -- callback if refresh fails
//  * @returns {Function} function to eject the interceptor
//  */

// // takes an axiosInstance and an options object - 'refreshEndpoint'  - my backend route to exchange a refresh token for a new one
// export const attachRefreshInterceptor = (
//   axiosInstance,
//   { refreshEndpoint, onRefreshFail } = {}
// ) => {
//   let isRefreshing = false;
//   let failedQueue = []; // hold requests that failed with a 401 while refreshis in progress

//   // helper to resolve/reject promises in failedQueue
//   const processQueue = (error, token = null) => {
//     failedQueue.forEach(({ resolve, reject }) => {
//       if (error) reject(error);
//       else resolve(token);
//     });
//     failedQueue = [];
//   };

//   const id = axiosInstance.interceptors.response.use(
//     (res) => res,
//     async (error) => {
//       const originalRequest = error.config;

//       if (!originalRequest || originalRequest._retry)
//         return Promise.reject(error);

//       // check if failed request's URL matches/contains refresh endpoint
//       if (originalRequest.url.includes(refreshEndpoint)) {
//         return Promise.reject(error);
//       }

//       // attempt refresh again only if error 401
//       if (error.response.status === 401) {
//         originalRequest._retry = true;

//         // queue until finished refreshing
//         if (isRefreshing) {
//           return new Promise((resolve, reject) => {
//             failedQueue.push({ resolve, reject });
//           })
//             .then((token) => {
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//               return axiosInstance(originalRequest);
//             })
//             .catch((error) => Promise.reject(error));
//         }

//         isRefreshing = true;
//         const refreshToken = getRefreshToken();

//         // if no token, no provided refresh enpoint - clear tokens, mark isRefreshing false, reject
//         if (!refreshToken || !refreshEndpoint) {
//           clearTokens();
//           if (typeof onRefreshFail === "function") onRefreshFail();
//           isRefreshing = false;
//           return Promise.reject(error);
//         }

//         // assuming refresh endpoints will return, new access and fresh tokens
//         try {
//           const response = await axiosInstance.post(refreshEndpoint, {
//             refreshToken,
//           });

//           const newAccessToken = response.data?.accessToken;
//           const newRefreshToken = response.data?.refreshToken;

//           if (!newAccessToken) {
//             throw new Error("No access token returned after refresh response");
//           }

//           setToken(newAccessToken);
//           if (newRefreshToken) setRefreshToken(newRefreshToken);

//           processQueue(null, newAccessToken); // resolve queued requests

//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // sets auth header to original req. and retries
//           return axiosInstance(originalRequest);
//         } catch (error) {
//           processQueue(error, null);
//           clearTokens();
//           if (typeof onRefreshFail === "function") onRefreshFail();
//           return Promise.reject(error);
//         } finally {
//           isRefreshing = false;
//         }
//       }

//       return Promise.reject(error);
//     }
//   );

//   return () => axiosInstance.interceptors.response.eject(id);
// };

// // set or clean default auth header on axios instance
// export const setAuthHeader = (axiosInstance, token) => {
//   axiosInstance.defaults.headers = axiosInstance.defaults.headers ?? {};
//   axiosInstance.defaults.headers.common =
//     axiosInstance.defaults.headers.common ?? {};

//   if (token) {
//     axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
//   } else {
//     delete axiosInstance.defaults.headers.common.Authorization;
//   }
// };

// TEST CODE
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/* --------------------------- Local Storage Helpers -------------------------- */

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

/**
 * Optional utility to clear both tokens at once.
 * You can call this manually, but Redux `logout()` already handles it.
 */
export const clearTokens = () => {
  removeToken();
  removeRefreshToken();
};

/* ----------------------------- Axios Integration ---------------------------- */

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
 * Automatically refreshes access token on 401s and retries failed requests.
 * @param {import('axios').AxiosInstance} axiosInstance
 * @param {Object} options
 * @param {string} options.refreshEndpoint - e.g. "/auth/refresh"
 * @param {Function} [options.onRefreshFail] - callback for failed refresh (logout)
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

      // don't retry refresh calls themselves
      if (originalRequest.url.includes(refreshEndpoint))
        return Promise.reject(error);

      // Only act on 401 errors
      if (error.response?.status === 401) {
        originalRequest._retry = true;

        // if another refresh is in progress, queue the request
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
 * Manually set or remove the default Authorization header.
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
