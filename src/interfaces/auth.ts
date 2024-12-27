export interface AuthState {
  isAuth: boolean;
  access: string;
  user: User;
  error: string;
  loading: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  base_url: string;
  role: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ISignIn {
  email: string;
  password: string;
}
