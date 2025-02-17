import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AuthService,
  ChatsInterface,
  ChatWSMessageInterface,
  ChatWsRxjsService,
  ChatWsServiceInterface,
  isNewMessageTypeGuard,
  isUnreadMessageTypeGuard,
  LastMessage,
  Message
} from '@ac/data-access';
import { firstValueFrom, map, Observable } from 'rxjs';

import { ProfileService } from '@ac/data-access';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  #authService = inject(AuthService);
  me = inject(ProfileService).me;

  wsAdapter: ChatWsServiceInterface = new ChatWsRxjsService()

  activeChatMessages = signal<Message[]>([]);
  unreadMessagesCount = signal<number>(0);

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

  handleWSMessage = async (message: ChatWSMessageInterface)=> {
    console.log('message: ', message);

    if (!('action' in message)) return;

    if (isUnreadMessageTypeGuard(message)) {
      this.unreadMessagesCount.set(message.data.count);
    }

    if (isNewMessageTypeGuard(message)) {
      const activeChatId = this.activeChatMessages()?.[0]?.personalChatId;
      if (message.data.chat_id !== activeChatId) return;

      const chat = await firstValueFrom(this.getChatById(message.data.chat_id));

      const isMessageExists = this.activeChatMessages().some(
        (msg) => msg.id === message.data.id
      );

      if (!isMessageExists) {
        const me = this.me();
        if (!me || !chat) return;
        const newMessage: Message = {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMyMessage: message.data.author === me.id,
          user: chat.userFirst.id === message.data.author
            ? chat.userFirst
            : chat.userSecond,
        };

        this.activeChatMessages.set([...this.activeChatMessages(), newMessage]);
      }
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
