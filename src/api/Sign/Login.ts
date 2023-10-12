import axios from "axios";
import api from "..";

type LoginData = {
  id: string;
  password: string;
};

export const useLogin = () => {
  const login = async (data: LoginData) => {
    try {
      await axios.get("sanctum/csrf-cookie");

      return await api.post("/api/login", data);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    return await axios.post("/api/logout");
  };

  return { login, logout };
};
