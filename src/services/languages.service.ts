import { IGetLanguages, IGoogleTranslate } from "../interfaces/languages";
import { Record } from "../interfaces/records";
import { Language } from "../interfaces/languages";
import axios from "../utils/axios";

export const getLanguages = async ({ page, limit, query }: IGetLanguages) => {
  try {
    const res = await axios.get(
      `language?page=${page}&limit=${limit}&query=${query}`
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Languages Service] Error in getLanguages");
    }
  } catch {
    throw new Error("[Languages Service] Network Error");
  }
};

export const addLanguage = async (data: Language) => {
  try {
    const res = await axios.post("language", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Languages Service] Error in addLanguage");
    }
  } catch {
    throw new Error("[Languages Service] Network Error");
  }
};

export const deleteLanguage = async (id?: string) => {
  try {
    const res = await axios.delete(`language?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Languages Service] Error in deleteLanguage");
    }
  } catch {
    throw new Error("[Languages Service] Network Error");
  }
};

export const googleTranslate = async ({
  text,
  target,
}: IGoogleTranslate): Promise<Record> => {
  try {
    const res = await axios.post(
      "translate",
      { text, target },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Languages Service] Error in googleTranslate");
    }
  } catch {
    throw new Error("[Languages Service] Network Error");
  }
};
