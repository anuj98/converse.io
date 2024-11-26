import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { Socket, io } from "socket.io-client";

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
  socket: Socket | null;
  onlineUserIds: string[];
  checkAuth: () => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (
    email: string,
    password: string,
    fullName: string,
    profilePic: string
  ) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  authUser: null,
  isSignIn: false,
  isLogin: false,
  isAuthenticating: true,
  socket: null,
  onlineUserIds: [],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      if (response.status === 200) {
        set({ authUser: response.data, isAuthenticating: false });
        get().connectSocket();
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
        get().connectSocket();
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
        get().disconnectSocket();
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
        get().connectSocket();
      } else {
        console.log("Failed to register", response.data);
        set({ authUser: null, isAuthenticating: false });
      }
    } catch (error) {
      console.log("Error in signup store function", error);
      set({ authUser: null, isAuthenticating: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io("http://localhost:5001", {
      query: {
        userId: authUser.id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUserIds: userIds });
    });
  },

  disconnectSocket: () => {
    const { socket, authUser } = get();
    if (authUser && socket?.connected) socket?.disconnect();
    socket?.on("getOnlineUsers", (userIds) => {
      set({ onlineUserIds: userIds });
    });
  },
}));
