import { Component, HostBinding, inject, input } from '@angular/core';
import { Message } from '../../../../../data/interfaces/chats.interface';
import { AvatarCircleComponent } from '../../../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { ChatsService } from '../../../../../data/services/chats.service';
import { firstValueFrom } from 'rxjs';
import { SvgIconComponent } from '../../../../../common-ui/svg-icon/svg-icon.component';

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

  async onDeleteChatMessage(message_id: number) {
    console.log('message_id', message_id);
    await firstValueFrom(this.chatsService.deleteChatMessage(message_id));
  }
}
