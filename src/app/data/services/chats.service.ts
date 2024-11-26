import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChatsInterface} from "../interfaces/chats.interface";

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  http = inject(HttpClient);

  baseUrl = 'https://icherniakov.ru/yt-course';
  chatUrl = `${this.baseUrl}/chat/`;
  messageUrl = `${this.baseUrl}/message/`;

  getMyChats() {
    return this.http.get<ChatsInterface[]>(`${this.chatUrl}get_my_chats/`);
  }

  getChatById(chat_id: number) {
    return this.http.get<ChatsInterface>(`${this.messageUrl}${chat_id}`);
  }

  createChat(user_id: number) {
    return this.http.post<ChatsInterface>(`${this.chatUrl}${user_id}`, {});
  }

  sendMessage(chat_id: number, message: string) {
    return this.http.post(`${this.messageUrl}send/${chat_id}`, {}, {
      params: {
        message
      }
    });
  }
}
