import { ChatWSMessageInterface } from './chat-ws-message.interface';
import { Observable } from 'rxjs';

export interface ChatConnectionWSParams {
  url: string,
  token: string,
  handleMessage: (message: ChatWSMessageInterface) => void
}

export interface ChatWsServiceInterface {
  connect: (params: ChatConnectionWSParams) => void | Observable<ChatWSMessageInterface>
  sendMessage: (text: string, chatId: number) => void
  disconnect: () => void
}
