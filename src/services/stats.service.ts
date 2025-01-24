import axios from "../utils/axios";

export const getStats = async () => {
  try {
    const res = await axios.get("stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Stats Service] Error in getStats");
    }
  } catch {
    throw new Error("[Stats Service] Network Error");
  }
};
