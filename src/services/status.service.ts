import axios from "axios";
import { ENV } from "../utils/constants";
import { IKohaStatusCheck } from "../interfaces/status";

export const csvStatusCheck = async () => {
  try {
    const res = await axios.get(ENV.BASE_API_URL, {
      validateStatus: (status) => status < 500,
    });
    if (res.status < 500) {
      return true;
    } else {
      return false;
    }
  } catch {
    throw new Error("[Status Service] Network Error");
  }
};

export const kohaStatusCheck = async ({ user }: IKohaStatusCheck) => {
  try {
    const res = await axios.get(
      `${user.base_url}cgi-bin/koha/ilsdi.pl?service=GetRecords`,
      {
        validateStatus: (status) => status < 500,
      }
    );
    if (res.status < 500) {
      return true;
    } else {
      return false;
    }
  } catch {
    throw new Error("[Status Service] Network Error");
  }
};

export const batchStatusCheck = async () => {
  try {
    const res = await axios.get("https://api.openai.com/v1/batches", {
      validateStatus: (status) => status < 500,
    });

    if (res.status < 500) {
      return true;
    } else {
      return false;
    }
  } catch {
    throw new Error("[Status Service] Network Error");
  }
};
