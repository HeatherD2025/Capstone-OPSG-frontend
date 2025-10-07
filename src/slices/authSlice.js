import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api/mainApi";
import { jwtDecode } from "jwt-decode";
import { getToken, setToken, removeToken } from "../utils/tokenService";

// helper to apply user payload to redux state
const applyAuthPayload = (state, payload) => {
  setToken(payload.token);
  state.isAuthenticated = true;
  state.user = payload.user;
  state.token = payload.token;
  state.isAdmin = payload.user?.isAdmin || false;
};

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async () => {
    const token = getToken();

    if (!token) {
      return { isAuthenticated: false, user: null, token: null };
    }

    try {
      const decoded = jwtDecode(token);
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
        token: token,
      };
    } catch (error) {
      removeToken();
      return { isAuthenticated: false, user: null, token: null };
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAdmin = action.payload.user?.isAdmin || false;
      })

      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        applyAuthPayload(state, payload);
      })
      .addMatcher(
        api.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          applyAuthPayload(state, payload);
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
