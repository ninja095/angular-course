import {
  ChatWSMessageInterface,
  ChatWSNewMessageInterface,
  ChatWSUnreadMessageInterface
} from './chat-ws-message.interface';


export function isUnreadMessageTypeGuard(message: ChatWSMessageInterface): message is ChatWSUnreadMessageInterface {
  return 'action' in message && message.action === 'unread';
}

export function isNewMessageTypeGuard(message: ChatWSMessageInterface): message is ChatWSNewMessageInterface {
  return 'action' in message && message.action === 'message';
}
