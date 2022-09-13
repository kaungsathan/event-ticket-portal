import api from "@/libs/axios";

const endpoints = {
  user: "https://dummyjson.com/users",
};

const userService = {
  getAll: async (params) => {
    try {
      const result = await api.get(endpoints.user, { params: params });
      return result.data;
    } catch {
      return undefined;
    }
  },
  getOne: async (params) => {
    try {
      const result = await api.get(`${endpoints.user}/${params.id}`);
      return result.data;
    } catch {
      return undefined;
    }
  },
  update: async (params) => {
    try {
      const result = await api.put(`${endpoints.user}/${params.id}`, params);
      return result.data;
    } catch {
      return undefined;
    }
  },
  add: async (params) => {
    try {
      const result = await api.post(endpoints.user, params);
      return result.data;
    } catch {
      return undefined;
    }
  },
  delete: async (params) => {
    try {
      const result = await api.delete(`${endpoints.user}/${params.id}`);
      return result.data;
    } catch {
      return undefined;
    }
  },
};

export { userService };
