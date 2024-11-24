import { create } from "zustand";

export interface IMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
}

export interface IMessageStore {
  messages: IMessage[];
  getMessages: () => void;
  sendMessage: () => void;
}

export const useMessageStore = create<IMessageStore>((set) => ({
  messages: [],

  getMessages: async () => {},
  sendMessage: async () => {},
}));
