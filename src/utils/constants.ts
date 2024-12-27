const BASE_API_URL = !import.meta.env.VITE_TYPE
  ? import.meta.env.VITE_BASE_API_URL_DEV
  : import.meta.env.VITE_BASE_API_URL;

export const ENV = {
  BASE_API_URL,
};
