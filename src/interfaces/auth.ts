import { User } from "./users";

export interface AuthState {
  isAuth: boolean;
  access: string;
  user: User;
  error: string;
  loading: boolean;
}

export interface ISignIn {
  email: string;
  password: string;
}
