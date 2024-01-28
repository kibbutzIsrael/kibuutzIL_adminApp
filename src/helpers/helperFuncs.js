import axiosInstance from "../services/AxiosInstance";
import { store } from "../store/store";
export const getEmailList = async () => {
  try {
    const res = await axiosInstance.get("/emaillist");
    return res;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const addListingPOST = async (email) => {
  try {
    const res = await axiosInstance.post("/emaillist", {
      ListEmail: email,
    });
    console.log(res);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const deleteListing = async (id) => {
  const state = store.getState();
  const token = state.auth.auth.idToken;
  try {
    const res = await axiosInstance.delete(`/emaillist/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
        // cookie: `jwt=${token}`,
      },
      withCredentials: true,
    });
    console.log(res);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
