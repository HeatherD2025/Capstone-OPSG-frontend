// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../features/api/mainApi";
// import { jwtDecode } from "jwt-decode";
// import {
//   getToken,
//   setToken,
//   removeToken,
//   getRefreshToken,
//   setRefreshToken,
//   removeRefreshToken,
// } from "../utils/tokenService";

// // helper to apply user payload to redux state
// const applyAuthPayload = (state, payload) => {
//   const { accessToken, refreshToken, user } = payload;

//   if (accessToken) setToken(accessToken);
//   if (refreshToken) setRefreshToken(refreshToken);

//   state.isAuthenticated = true;
//   state.user = user;
//   state.accessToken = accessToken;
//   state.refreshToken = refreshToken;
//   state.isAdmin = user?.isAdmin || false;
// };

// export const initializeAuth = createAsyncThunk(
//   "auth/initializeAuth",
//   async (_, { dispatch }) => {
//     const accessToken = getToken();
//     const refreshToken = getRefreshToken();

//     if (!accessToken) {
//       return { isAuthenticated: false, user: null, accessToken: null };
//     }

//     try {
//       const decoded = jwtDecode(accessToken);
//       const user = {
//         id: decoded.id,
//         firstName: decoded.firstName,
//         lastName: decoded.lastName,
//         email: decoded.email,
//         isAdmin: decoded.isAdmin || false,
//       };

//       return {
//         isAuthenticated: true,
//         user,
//         accessToken,
//         refreshToken,
//       };
//     } catch (error) {
//       removeToken();
//       removeRefreshToken();
//       return {
//         isAuthenticated: false,
//         user: null,
//         accessToken: null,
//         refreshToken: null,
//       };
//     }
//   }
// );

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   isAdmin: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.isAdmin = false;
//       removeToken();
//       removeRefreshToken();
//     },
//     setTokens: (state, action) => {
//       // manually update tokens in redux and local storage
//       const { accessToken, refreshToken } = action.payload;
//       if (accessToken) setToken(accessToken);
//       if (refreshToken) setRefreshToken(refreshToken);
//       state.accessToken = accessToken;
//       state.refreshToken = refreshToken;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(initializeAuth.fulfilled, (state, action) => {
//         state.isAuthenticated = action.payload.isAuthenticated;
//         state.user = action.payload.user;
//         state.accessToken = action.payload.accessToken;
//         state.refreshToken = action.payload.refreshToken;
//         state.isAdmin = action.payload.user?.isAdmin || false;
//       })
//       .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
//         applyAuthPayload(state, payload);
//       })
//       .addMatcher(
//         api.endpoints.register.matchFulfilled,
//         (state, { payload }) => {
//           applyAuthPayload(state, payload);
//         }
//       );
//   },
// });

// export const { logout, setTokens } = authSlice.actions;
// export default authSlice.reducer;

// TEST CODE
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api/mainApi";
import { jwtDecode } from "jwt-decode";
import {
  getToken,
  setToken,
  getRefreshToken,
  setRefreshToken,
  clearTokens,
} from "../utils/tokenService";

// Helper to apply user + tokens into Redux state and persist locally
const applyAuthPayload = (state, payload) => {
  const accessToken = payload?.accessToken || payload?.token;
  const refreshToken = payload?.refreshToken;
  const user = payload?.user;

  if (accessToken) setToken(accessToken);
  if (refreshToken) setRefreshToken(refreshToken);

  state.isAuthenticated = true;
  state.user = user;
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.isAdmin = user?.isAdmin || false;
};

// Initialize Redux auth state from localStorage on app start
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async () => {
    const accessToken = getToken();
    const refreshToken = getRefreshToken();

    if (!accessToken) {
      return { isAuthenticated: false, user: null, accessToken: null };
    }

    try {
      const decoded = jwtDecode(accessToken);
      const user = {
        id: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        isAdmin: decoded.isAdmin || false,
      };

      return {
        isAuthenticated: true,
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      clearTokens();
      return {
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
      };
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.isAdmin;
    },
    // called manually on logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAdmin = false;
      clearTokens();
    },

    // used by Login.jsx (manual dispatch)
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      if (accessToken) setToken(accessToken);
      if (refreshToken) setRefreshToken(refreshToken);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = !!accessToken;
    },

    // optional: clears Redux but leaves localStorage alone
    clearReduxAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAdmin = action.payload.user?.isAdmin || false;
      })

      // Handle login + registration RTK Query endpoints
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        applyAuthPayload(state, payload?.data || payload);
      })
      .addMatcher(api.endpoints.register.matchFulfilled, (state, { payload }) => {
        applyAuthPayload(state, payload?.data || payload);
      });
  },
});

export const { loginSuccess, logout, setTokens, clearReduxAuth } = authSlice.actions;
export default authSlice.reducer;

