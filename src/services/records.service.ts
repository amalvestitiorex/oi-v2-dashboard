import {
  IDeleteRecord,
  IFindAllRecords,
  IFindRecord,
  IUpdateRecord,
  PaginationRecords,
} from "../interfaces/records";
import axios from "../utils/axios";

export const findAllRecords = async ({
  page,
  limit,
  active,
  query,
  startDate,
  endDate,
}: IFindAllRecords): Promise<PaginationRecords> => {
  try {
    const res = await axios.get(
      `/record/list?page=${page}&limit=${limit}&active=${active}&query=${query}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Records Service] Error in findAllRecords");
    }
  } catch {
    throw new Error("[Records Service] Network Error");
  }
};

export const updateRecord = async ({ id, data }: IUpdateRecord) => {
  try {
    const res = await axios.patch(`/record/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Records Service] Error in updateRecord");
    }
  } catch {
    throw new Error("[Records Service] Network Error");
  }
};

export const findRecord = async ({ id }: IFindRecord) => {
  try {
    const res = await axios.get(`/record/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Records Service] Error in findRecord");
    }
  } catch {
    throw new Error("[Records Service] Network Error");
  }
};

export const deleteRecord = async ({ id }: IDeleteRecord) => {
  try {
    const res = await axios.delete(`/record/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Records Service] Error in deleteRecord");
    }
  } catch {
    throw new Error("[Records Service] Network Error");
  }
};
