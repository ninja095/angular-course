import { ChatConnectionWSParams, ChatWsServiceInterface } from '../interfaces/chat-ws-service.interface';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { ChatWSMessageInterface } from '../interfaces/chat-ws-message.interface';
import { webSocket } from 'rxjs/webSocket';
import { finalize, Observable, tap } from 'rxjs';

export class ChatWsRxjsService implements ChatWsServiceInterface {
  #socket: WebSocketSubject<ChatWSMessageInterface> | null = null;

  connect (params: ChatConnectionWSParams): Observable<ChatWSMessageInterface>  {
    if (!this.#socket) {
      this.#socket = webSocket({
      url: params.url,
      protocol: [params.token]
      });
    }
    return this.#socket.asObservable().pipe(
      tap((message) => params.handleMessage(message)),
      finalize(() => console.log('Closed session')));
  };

  sendMessage(text: string, chatId: number): void {
    this.#socket?.next({
      text,
      chat_id: chatId,
    });
  };

  disconnect(): void {
    this.#socket?.complete();
  }

}
