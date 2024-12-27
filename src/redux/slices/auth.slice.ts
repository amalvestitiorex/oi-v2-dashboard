import { createSlice } from "@reduxjs/toolkit";
import { authThunk } from "../thunks/auth.thunk";
import { getUserByToken, hasExpiredToken } from "../../utils/jwt";
import { toast } from "react-toastify";
import { AuthState, User } from "../../interfaces/auth";

const accessToken = localStorage.getItem("access");

const initialState: AuthState = {
  isAuth: accessToken ? !hasExpiredToken(accessToken) : false,
  access: accessToken ? accessToken : "",
  user: accessToken ? getUserByToken(accessToken) : ({} as User),
  error: "",
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem("access");
      state.access = "";
      state.isAuth = false;
      state.user = {} as User;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authThunk.pending, (state) => {
      return (state = {
        ...state,
        loading: true,
        isAuth: false,
        access: "",
      });
    });
    builder.addCase(authThunk.fulfilled, (state, action) => {
      localStorage.setItem("access", action.payload.access);
      const user = getUserByToken(action.payload.access);
      toast.success("Logged in successfully");
      return (state = {
        ...state,
        loading: false,
        access: action.payload.access,
        user: user,
        isAuth: true,
      });
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(authThunk.rejected, (state, action: any) => {
      toast.error(action.payload);
      return (state = {
        ...state,
        error: action.payload,
        loading: false,
        isAuth: false,
        access: "",
      });
    });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
