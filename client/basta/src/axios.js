import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response?.status === 401) {
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error(err);
    }
    throw error;
  }
);

export default Axios;
