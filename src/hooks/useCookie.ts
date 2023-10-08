import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const removeCookie = (name: string) => {
  cookies.remove(name);
};
