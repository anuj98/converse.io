import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  profilePic: string;
  createAt: string;
  updatedAt: string;
}

export interface IAuthStore {
  authUser?: IUser | null;
  isSignIn: boolean;
  isLogin: boolean;
  isAuthenticating: boolean;
  checkAuth: () => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (
    email: string,
    password: string,
    fullName: string,
    profilePic: string
  ) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  authUser: null,
  isSignIn: false,
  isLogin: false,
  isAuthenticating: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      if (response.status === 200) {
        set({ authUser: response.data, isAuthenticating: false });
      } else {
        set({ authUser: null, isAuthenticating: false });
      }
    } catch (error) {
      console.log("Error in checkAuth store function", error);
      set({ authUser: null, isAuthenticating: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      const payload = {
        email: email,
        password: password,
      };
      const response = await axiosInstance.post("/auth/login", payload);
      if (response.status === 200) {
        set({ authUser: response.data, isAuthenticating: false });
      }
    } catch (error) {
      console.log("Error in login store function", error);
      set({ authUser: null, isAuthenticating: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.status === 200) {
        set({ authUser: null, isAuthenticating: false });
      }
    } catch (error) {
      console.log("Error in login store function", error);
      set({ authUser: null, isAuthenticating: false });
    }
  },

  signup: async (
    email: string,
    password: string,
    fullName: string,
    profilePic: string
  ) => {
    try {
      const payload = {
        email: email,
        password: password,
        fullName: fullName,
        profilePic: profilePic,
      };
      const response = await axiosInstance.post("/auth/signup", payload);
      if (response.status === 201) {
        console.log("Sign up Status", response.data);
        set({ authUser: response.data, isAuthenticating: false });
      } else {
        console.log("Failed to register", response.data);
        set({ authUser: null, isAuthenticating: false });
      }
    } catch (error) {
      console.log("Error in signup store function", error);
      set({ authUser: null, isAuthenticating: false });
    }
  },
}));
