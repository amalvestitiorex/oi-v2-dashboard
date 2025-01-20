import axios from "../utils/axios";

export const getTranslations = async () => {
  try {
    const res = await axios.get("/translations");
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Locales Service] Error in getLocales");
    }
  } catch {
    throw new Error("[Locales Service] Network Error");
  }
};
