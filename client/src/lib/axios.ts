import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://converse-io-server.vercel.app/api", // "http://localhost:5001/api" for local
  withCredentials: true,
});
