import {Profile} from "./profile.interface";

export interface ChatsInterface {

  id: number,
  userFirst: Profile,
  userSecond: Profile,
  messages: Message[],
}

export interface Message {
  id: number,
  userFromId: number,
  personalChatId: number,
  text: string,
  createdAt: string,
  isRead: boolean,
  updatedAt: string,
}
