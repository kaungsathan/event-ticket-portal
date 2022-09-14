import api from "@/libs/axios";
import Cookies from "js-cookie";

const endpoints = {
  login: "https://dummyjson.com",
};

const authService = {
  login: async (params) => {
    try {
      const result = await api.get(endpoints.login, { params: params });
      if (result) {
        Cookies.set("userToken", params.email);
      }
      return result.data;
    } catch {
      return null;
    }
  },
  logout: () => {
    Cookies.remove("userToken");
  },
};

export { authService };
