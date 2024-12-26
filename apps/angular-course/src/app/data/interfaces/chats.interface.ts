import { Profile } from './profile.interface';

export interface ChatsInterface {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Message[];
  companion?: Profile;
}

export interface Message {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string;
  user?: Profile;
  isMyMessage?: boolean;
}

export interface LastMessage {
  id: number;
  userFrom: Profile;
  message: string | null | undefined;
}
