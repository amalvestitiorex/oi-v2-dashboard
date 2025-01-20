import axios from "../utils/axios";

export const getLogs = async () => {
  try {
    const res = await axios.get("log", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Logs Service] Error in getLogs");
    }
  } catch {
    throw new Error("[Logs Service] Network Error");
  }
};

export const deleteLogs = async () => {
  try {
    const res = await axios.delete("log", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Logs Service] Error in deleteLogs");
    }
  } catch {
    throw new Error("[Logs Service] Network Error");
  }
};
