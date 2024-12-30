import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewChild,
} from '@angular/core';
import { ChatWorkspaceMessagesComponent } from './chat-workspace-messages/chat-workspace-messages.component';
import { MessageInputComponent } from '../../../../common-ui/message-input/message-input.component';
import {
  ChatsInterface,
  Message,
} from '../../../../../../../../libs/chats/src/lib/data/interfaces/chats.interface';
import { firstValueFrom, Subject } from 'rxjs';
import { ChatsService } from '@ac/chats';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessagesComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent implements AfterViewInit {
  @ViewChild('messagesContent') messagesContent!: ElementRef;

  chatsService = inject(ChatsService);

  destroy$ = new Subject<void>();
  chat = input.required<ChatsInterface>();

  messages = this.chatsService.activeChatMessages;

  groupedMessages = computed(() => {
    const grouped = this.messages().reduce((acc, message) => {
      const utcDate = new Date(message.createdAt);
      const localDate = new Date(
        utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
      );
      const dateKey = new Date(localDate).toISOString().split('T')[0];
      const label = this.getDateLabel(dateKey);

      if (!acc[label]) {
        acc[label] = [];
      }
      acc[label].push(message);
      acc[label].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      return acc;
    }, {} as Record<string, Message[]>);
    return Object.entries(grouped);
  });

  constructor() {}

  private scrollToBottom(): void {
    const element = this.messagesContent.nativeElement;
    element.scrollTop = element.scrollHeight;
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  getDateLabel(dateString: string): string {
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000); // Время 24 часа назад

    const date = new Date(dateString);
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return 'Сегодня';
    if (isYesterday) return 'Вчера';
    return date.toLocaleDateString();
  }
  // private autoSendMessage() {
  //   timer(0, 10000)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(() => {
  //       this.onSendMessage('Automated message');
  //     });
  // }

  async onSendMessage(message: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, message)
    );
    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
    this.scrollToBottom();
  }
}
