import {
  IAddBuy,
  IBuysRecords,
  IDeleteRecord,
  IFindAllRecords,
  IFindRecord,
  ISearchKohaRecords,
  IUpdateRecord,
  IUploadCsvRecords,
  PaginationRecords,
  Record,
  ResponseBuys,
} from "../interfaces/records";
import axios from "../utils/axios";

export const uploadCsvRecords = async ({ data }: IUploadCsvRecords) => {
  try {
    const res = await axios.post(`/csv`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Records Service] Error in uploadCsvRecords");
    }
  } catch {
    throw new Error("[Records Service] Network Error");
  }
};

export const searchKohaRecords = async ({ id }: ISearchKohaRecords) => {
  try {
    const res = await axios.get(`/koha/search?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Records Service] Error in searchKohaRecords");
    }
  } catch {
    throw new Error("[Records Service] Network Error");
  }
};

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

export const findRecord = async ({ id }: IFindRecord): Promise<Record> => {
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

export const getBuys = async ({
  page,
  limit,
}: IBuysRecords): Promise<ResponseBuys> => {
  try {
    const res = await axios.get(`/buy?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Records Service] Error in getBuys");
    }
  } catch {
    throw new Error("[Records Service] Network Error");
  }
};

export const addBuy = async ({ data }: IAddBuy) => {
  try {
    const res = await axios.post(`/buy`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Records Service] Error in addBuy");
    }
  } catch {
    throw new Error("[Records Service] Network Error");
  }
};
