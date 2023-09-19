import { useDispatch } from "react-redux";
import api from ".."
import { setUser } from "../../store/userSlice";
import { showClose } from "../../store/modalSlice";

type LoginData = {
  id: string;
  password: string;
}

export const useLogin = () => {
  const dispatch = useDispatch();

  const login = async (data: LoginData) => {
    await api.get('sanctum/csrf-cookie');
    console.log("cookie");
    
    await api.post('/api/login', data)
    .then((res) => {
      console.log(res);

      dispatch(setUser({
        id: res.data.id,
        nickname: res.data.nickname,
        photo: 'https://cdn-icons-png.flaticon.com/512/3985/3985429.png'
      }));

      dispatch(showClose());

      throw res;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  };

  return { login };
};