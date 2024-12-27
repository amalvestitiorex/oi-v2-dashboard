import Axios from "axios";
import { ENV } from "./constants";

const axios = Axios.create({
  baseURL: ENV.BASE_API_URL,
});

export default axios;
