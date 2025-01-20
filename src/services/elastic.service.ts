import axios from "../utils/axios";
import { IGetRecommendations, IRecommendations } from "../interfaces/elastic";

export const getRecommendations = async ({
  id,
  isbn,
}: IGetRecommendations): Promise<IRecommendations> => {
  try {
    const res = await axios.get(
      `/elastic/recommendations?id=${id}&isbn=${isbn}`,
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
