import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

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
  groups: IMessage[];
  groupConversation: IMessage[];
  selectedGroup?: string | null;
  setSelectedGroup: (selectedGroup: string) => void;
  getTopMessages: () => void;
  getGroupMessages: (userId: string) => void;
  sendMessage: (userId: string, text: string) => void;
  subscribe: () => void;
  unsubscribe: () => void;
}

export const useMessageStore = create<IMessageStore>((set, get) => ({
  groups: [],
  groupConversation: [],
  selectedGroup: null,

  setSelectedGroup: (selectedGroup: string) => {
    set({ selectedGroup });
  },

  getTopMessages: async () => {
    try {
      const response = await axiosInstance.get("/messages");
      if (response.status === 200) {
        set({ groups: response.data });
      } else {
        set({ groups: [] });
      }
    } catch (error) {
      console.log("Error in getTopMessages store function", error);
      set({ groups: [] });
    }
  },

  getGroupMessages: async (userId: string) => {
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

  subscribe: () => {
    const { selectedGroup } = get();
    if (!selectedGroup) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (message) => {
      if (message.senderId !== selectedGroup) return;
      
      const requiredUserTopMessage = get().groups.filter(
        (oldMessage) =>
          oldMessage.senderId !== selectedGroup &&
          oldMessage.recieverId !== selectedGroup
      );
      let updatedMessages = [...requiredUserTopMessage, message];
      if (requiredUserTopMessage) {
        set({ groups: updatedMessages });
      }
      set({
        groupConversation: [...get().groupConversation, message],
      });
    });
  },

  unsubscribe: () => {
    const socket = useAuthStore.getState().socket;

    socket?.off("newMessage");
  },
}));
