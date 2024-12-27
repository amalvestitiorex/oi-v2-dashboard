import { jwtDecode, JwtPayload } from "jwt-decode";
import { User } from "../interfaces/auth";

export interface JwtResponse extends JwtPayload {
  user: User;
}

export const hasExpiredToken = (token: string) => {
  const { exp } = jwtDecode<JwtResponse>(token);
  const currentData = new Date().getTime();
  if (!exp || exp <= currentData) {
    return true;
  }
  return false;
};

export const getUserByToken = (token: string) => {
  const { user } = jwtDecode<JwtResponse>(token);
  return user;
};
