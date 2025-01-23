import { Profile } from '@ac/interfaces/profile';

export interface ChatWSMessageBaseInterface {
  status: 'success' | 'error';
}

export interface ChatWSUnreadMessageInterface extends ChatWSMessageBaseInterface {
  action: 'unread';
  data: {
    count: number;
  };
}

export interface ChatWSNewMessageInterface extends ChatWSMessageBaseInterface {
  action: 'message';
  data: {
    id: number;
    message: string;
    chat_id: number;
    created_at: string;
    author: number;
    isMyMessage: boolean,
    isRead: boolean,
    user?: Profile;
  }
}

export interface ChatWSErrorInterface extends ChatWSMessageBaseInterface {
  message: string;
}

export interface ChatWSSendMessageInterface {
  text: string;
  chat_id: number;
}

export type ChatWSMessageInterface =  ChatWSUnreadMessageInterface | ChatWSNewMessageInterface | ChatWSErrorInterface | ChatWSSendMessageInterface;
