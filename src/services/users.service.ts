import { UserFormValues } from "../components/ui/Forms/UserForm/UserForm.form";
import { IFindAllUsers, PaginationUsers, User } from "../interfaces/users";
import axios from "../utils/axios";

export const findAllUsers = async ({
  page,
  limit,
  query,
}: IFindAllUsers): Promise<PaginationUsers> => {
  try {
    const res = await axios.get(
      `/user/list?page=${page}&limit=${limit}&query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Users Service] Error in findAllUsers");
    }
  } catch {
    throw new Error("[Users Service] Network Error");
  }
};

export const findUser = async (id?: string) => {
  try {
    const res = await axios.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Users Service] Error in findUser");
    }
  } catch {
    throw new Error("[Users Service] Network Error");
  }
};

export const createUser = async (data: User) => {
  try {
    const res = await axios.post("/user", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Users Service] Error in createUser");
    }
  } catch {
    throw new Error("[Users Service] Network Error");
  }
};

export const updateUser = async (id?: string, data?: UserFormValues) => {
  try {
    const res = await axios.patch(`/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Users Service] Error in updateUser");
    }
  } catch {
    throw new Error("[Users Service] Network Error");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await axios.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("[Users Service] Error in deleteUser");
    }
  } catch {
    throw new Error("[Users Service] Network Error");
  }
};
