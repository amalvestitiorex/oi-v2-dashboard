import { ISignIn } from "../interfaces/auth";
import axios from "../utils/axios";

export const signIn = async ({ email, password }: ISignIn) => {
  try {
    const res = await axios.post(`auth/signin`, {
      email,
      password,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Auth Service] Error in SignIn");
    }
  } catch {
    throw new Error("[Auth Service] Network Error");
  }
};
