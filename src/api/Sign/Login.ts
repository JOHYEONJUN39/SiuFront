import api from "..";

type LoginData = {
  id: string;
  password: string;
};

export const useLogin = () => {
  const login = async (data: LoginData) => {
    await api.get("sanctum/csrf-cookie");

    return await api.post("/api/login", data);
  };

  return { login };
};
