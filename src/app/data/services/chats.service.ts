import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChatsInterface, LastMessage, Message} from "../interfaces/chats.interface";
import {ProfileService} from "./profile.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;

  activeChatMessages = signal<Message[]>([]);

  baseUrl = 'https://icherniakov.ru/yt-course';
  chatUrl = `${this.baseUrl}/chat/`;
  messageUrl = `${this.baseUrl}/message/`;

  getMyChats() {
    return this.http.get<LastMessage[]>(`${this.chatUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<ChatsInterface>(`${this.chatUrl}${chatId}`).pipe(
      map(chat => {
        const patchedMessages = chat.messages.map(message => ({
          ...message,
          user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
          isMyMessage: message.userFromId === this.me()!.id
        }));

        this.activeChatMessages.set(patchedMessages);
        return {
          ...chat,
          companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
          messages: patchedMessages,
        }
      }
    ));
  }

  createChat(user_id: number) {
    return this.http.post<ChatsInterface>(`${this.chatUrl}${user_id}`, {});
  }

  sendMessage<Message>(chat_id: number, message: string) {
    return this.http.post(`${this.messageUrl}send/${chat_id}`, {}, {
      params: {
        message
      }
    });
  }

  deleteChatMessage(message_id: number) {
    return this.http.delete(`${this.messageUrl}${message_id}`).pipe(
      map(() => {
        const updatedMessages = this.activeChatMessages().filter(
          message => message.id !== message_id
        );
        this.activeChatMessages.set(updatedMessages);
      })
    )
  }
}
