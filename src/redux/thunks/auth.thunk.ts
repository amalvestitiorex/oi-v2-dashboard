import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "../../services/auth.service";

interface IAuth {
  email: string;
  password: string;
}

export const authThunk = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: IAuth, { rejectWithValue }) => {
    try {
      const res = await signIn({ email, password });
      if (res.status !== 200) {
        return rejectWithValue(res.message);
      }
      return { access: res.access };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Network Error");
    }
  }
);
