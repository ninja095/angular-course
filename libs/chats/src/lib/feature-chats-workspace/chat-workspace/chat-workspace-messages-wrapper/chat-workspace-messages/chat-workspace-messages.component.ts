import { Component, HostBinding, inject, input } from '@angular/core';
import { Message } from '@ac/interfaces/chats/chats.interface';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { AvatarCircleComponent, SvgIconComponent } from '@ac/common-ui';
import { ChatsService } from '../../../../data';


@Component({
  selector: 'app-chat-workspace-messages',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe, SvgIconComponent],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.scss',
})
export class ChatWorkspaceMessagesComponent {
  chatsService = inject(ChatsService);
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMyMessage;
  }

  ngOnInit() {
    console.log('is my message: ',this.message())
  }

  async onDeleteChatMessage(message_id: number) {
    console.log('message_id', message_id);
    await firstValueFrom(this.chatsService.deleteChatMessage(message_id));
  }
}
