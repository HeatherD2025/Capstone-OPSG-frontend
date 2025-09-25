import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import jwtDecode from "jwt-decode";
import { getToken, setToken, removeToken} from "../utils/tokenService";

const tokenFromStorage = getToken();

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (__, thunkAPI) => {
    const token = getToken();

    if (!token) {
      return { isAuthenticated: false, user: null, accessToken: null }
    }

    try {
      const decoded = jwtDecode(token);
      const user = {
        id: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        isAdmin: decoded.isAdmin || false,
      }
      return {
        isAuthenticated: true,
        user,
        accessToken: token,
      };
    } catch (error) {
      removeToken();
      return { isAuthenticated: false, user: null, accessToken: null}
    }
  }
);

const initialState ={
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

// register
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      removeToken()
    },
  },
  extraReducers: (builder) => {
   builder
   .addCase(initializeAuth.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
  })

    .addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        setToken(payload.token)
        state.isAuthenticated = true;
        state.user = payload.user;
        state.accessToken = payload.accessToken;
      }
    )
});

const loginSlice = createSlice({
  name: "siteLogin",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});

const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getAllUsers.matchFulfilled);
  },
});

const updateUserProfileSlice = createSlice({
  name: "updateUserProfile",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.updateUserProfile.matchFulfilled);
  },
});

export const siteRegisterReducer = registerSlice.reducer;
export const siteLoginReducer = loginSlice.reducer;
export const getAllUsersReducer = getAllUsersSlice.reducer;
export const updateUserProfileReducer = updateUserProfileSlice.reducer;
