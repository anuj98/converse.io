import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export interface IMessage {
  id: string;
  senderId: string;
  recieverId: string;
  text?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessageStore {
  messages: IMessage[];
  groupConversation: IMessage[];
  selectedGroup?: string | null;
  getTopMessages: () => void;
  getMessagesForSingleFriend: (userId: string) => void;
  sendMessage: (userId: string, text: string) => void;
}

export const useMessageStore = create<IMessageStore>((set) => ({
  messages: [],
  groupConversation: [],
  selectedGroup: null,
  getTopMessages: async () => {
    try {
      const response = await axiosInstance.get("/messages");
      if (response.status === 200) {
        set({ messages: response.data });
      } else {
        set({ messages: [] });
      }
    } catch (error) {
      console.log("Error in getTopMessages store function", error);
      set({ messages: [] });
    }
  },

  getMessagesForSingleFriend: async (userId: string) => {
    try {
      set({ selectedGroup: userId });
      const response = await axiosInstance.get(`/messages/user/${userId}`);
      if (response.status === 200) {
        set({ groupConversation: response.data });
      } else {
        set({ groupConversation: [] });
      }
    } catch (error) {
      console.log("Error in getTopMessages store function", error);
      set({ groupConversation: [] });
    }
  },

  sendMessage: async (recieverId: string, text: string) => {
    try {
      const response = await axiosInstance.post(
        "/messages",
        {
          recieverId: recieverId,
          text: text,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Message send response", response.data);
    } catch (error) {
      console.log("Error in getTopMessages store function", error);
    }
  },
}));
