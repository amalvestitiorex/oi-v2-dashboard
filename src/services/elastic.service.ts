import axios from "../utils/axios";
import { IGetRecommendations, IRecommendations } from "../interfaces/elastic";

export const getRecommendations = async ({
  id,
  isbn,
}: IGetRecommendations): Promise<IRecommendations> => {
  try {
    const res = await axios.get(
      `/elastic/recommendations?id=${id ? id : "none"}&isbn=${
        isbn ? isbn : "none"
      }`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Elastic Service] Error in getRecommendations");
    }
  } catch {
    throw new Error("[Elastic Service] Network Error");
  }
};

export const getDocumentLoans = async (prefix?: string, id?: string) => {
  try {
    const res = await axios.get(`/elastic/loans?prefix=${prefix}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Elastic Service] Error in getDocumentLoans");
    }
  } catch {
    throw new Error("[Elastic Service] Network Error");
  }
};

export const getDocumentViews = async (prefix?: string, id?: string) => {
  try {
    const res = await axios.get(`/elastic/views?prefix=${prefix}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Elastic Service] Error in getDocumentViews");
    }
  } catch {
    throw new Error("[Elastic Service] Network Error");
  }
};

export const getDocumentDownloads = async (prefix?: string, id?: string) => {
  try {
    const res = await axios.get(
      `/elastic/downloads?prefix=${prefix}&id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Elastic Service] Error in getDocumentDownloads");
    }
  } catch {
    throw new Error("[Elastic Service] Network Error");
  }
};
