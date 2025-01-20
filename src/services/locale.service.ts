import { IGetLocales, Locale } from "../interfaces/locales";
import axios from "../utils/axios";

export const getLocales = async ({ page, limit, query }: IGetLocales) => {
  try {
    const res = await axios.get(
      `locale?page=${page}&limit=${limit}&query=${query}`
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Locales Service] Error in getLocales");
    }
  } catch {
    throw new Error("[Locales Service] Network Error");
  }
};

export const addLocale = async (data: Locale) => {
  try {
    const res = await axios.post(`locale`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Locales Service] Error in addLocale");
    }
  } catch {
    throw new Error("[Locales Service] Network Error");
  }
};

export const deleteLocale = async (id?: string) => {
  try {
    const res = await axios.delete(`locale?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Locales Service] Error in deleteLocale");
    }
  } catch {
    throw new Error("[Locales Service] Network Error");
  }
};
