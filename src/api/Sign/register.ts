import axios from "axios";

type RegisterData = {
  id: string;
  nickname: string;
  password: string;
};

export const register = async (data: RegisterData) => {
  return await axios.post("/api/register", data);
};
