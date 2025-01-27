import {
  ChatWSMessageInterface,
  ChatWSNewMessageInterface,
  ChatWSUnreadMessageInterface
} from '../interfaces/chat-ws-message.interface';


export function isUnreadMessageTypeGuard(message: ChatWSMessageInterface): message is ChatWSUnreadMessageInterface {
  return 'action' in message && message.action === 'unread';
}

export function isNewMessageTypeGuard(message: ChatWSMessageInterface): message is ChatWSNewMessageInterface {
  return 'action' in message && message.action === 'message';
}

export function isErrorMessageTypeGuard(message: ChatWSMessageInterface): message is ChatWSUnreadMessageInterface {
  return 'status' in message && message.status === 'error';
}
