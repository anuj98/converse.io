import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api", // "http://localhost:5001/api" for local
  withCredentials: true,
});
