import api from "..";

type RegisterData = {
  id: string;
  nickname: string;
  password: string;
}

export const register = async (data: RegisterData) => {
  console.log(data);

  api.post('/api/register', data)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.response);
  });
}