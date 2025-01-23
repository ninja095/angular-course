import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ChatsInterface,
  LastMessage,
  Message,
} from '@ac/interfaces/chats/chats.interface';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ProfileService } from '@ac/profile';
import { ChatWSMessageInterface } from '../interfaces/chat-ws-message.interface';
import { ChatWsServiceInterface } from '../interfaces/chat-ws-service.interface';
import { AuthService } from '@ac/auth';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';
import { isNewMessageTypeGuard, isUnreadMessageTypeGuard } from '../interfaces/type-guard';
import { Profile } from '@ac/interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  #authService = inject(AuthService);
  me = inject(ProfileService).me;

  wsAdapter: ChatWsServiceInterface = new ChatWsRxjsService()

  activeChatMessages = signal<Message[]>([]);

  baseUrl = 'https://icherniakov.ru/yt-course';
  chatUrl = `${this.baseUrl}/chat/`;
  messageUrl = `${this.baseUrl}/message/`;

  connectWebSocket() {
    return this.wsAdapter.connect({
      url: `${this.chatUrl}ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage,
    }) as Observable<ChatWSMessageInterface>
  }

  async reconnectWithRefreshToken() {
    await firstValueFrom(this.#authService.refreshTokens());
    this.connectWebSocket();
  }

  handleWSMessage = (message: ChatWSMessageInterface)=> {
    console.log('message: ', message);
    if (!('action' in message)) return;
    if (isUnreadMessageTypeGuard(message)) {
      // todo вынести выше в app компоонент чтобы на старте проверять
    }
    if (isNewMessageTypeGuard(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          user:
            message.userFirst.id === message.data.author
              ? chat.userFirst
              : chat.userSecond,
          isMyMessage: message.data.author === this.me()!.id,
        }]);
    }
  }

  getMyChats() {
    return this.http.get<LastMessage[]>(`${this.chatUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<ChatsInterface>(`${this.chatUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => ({
          ...message,
          user:
            chat.userFirst.id === message.userFromId
              ? chat.userFirst
              : chat.userSecond,
          isMyMessage: message.userFromId === this.me()!.id,
        }));

        this.activeChatMessages.set(patchedMessages);
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  createChat(user_id: number) {
    return this.http.post<ChatsInterface>(`${this.chatUrl}${user_id}`, {});
  }

  sendMessage<Message>(chat_id: number, message: string) {
    return this.http.post(
      `${this.messageUrl}send/${chat_id}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }

  deleteChatMessage(message_id: number) {
    return this.http.delete(`${this.messageUrl}${message_id}`).pipe(
      map(() => {
        const updatedMessages = this.activeChatMessages().filter(
          (message) => message.id !== message_id
        );
        this.activeChatMessages.set(updatedMessages);
      })
    );
  }
}
