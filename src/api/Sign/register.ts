import api from "..";

type RegisterData = {
  id: string;
  nickname: string;
  password: string;
}

export const register = async (data: RegisterData) => {
  return await api.post('/api/register', data)
}