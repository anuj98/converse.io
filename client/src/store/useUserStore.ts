import { create } from "zustand";
import { IUser } from "./useAuthStore";
import { axiosInstance } from "../lib/axios";

export interface IUserStore {
  allUsers?: IUser[] | null;
  getUsers: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  allUsers: null,

  getUsers: async () => {
    try {
      const response = await axiosInstance.post("/users");
      if (response.status === 200) {
        set({ allUsers: response.data });
      }
    } catch (error) {
      console.log("Error in getUsers store function", error);
      set({ allUsers: null });
    }
  }
}));
