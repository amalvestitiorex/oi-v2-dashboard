import { Context } from "../interfaces/context";
import axios from "../utils/axios";

export const getContext = async (id?: string): Promise<Context[]> => {
  try {
    const res = await axios.get(`entities?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Context Service] Error in getContext");
    }
  } catch {
    throw new Error("[Context Service] Network Error");
  }
};
