import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

// api.interceptors.request.use(async (config) => {
//   return config;
// });

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 410 && !originalRequest._retry) {
      console.log("error 410");
    }
    return Promise.reject(error);
  }
);

export default api;
