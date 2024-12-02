import {Component, inject, input, signal} from '@angular/core';
import {ChatWorkspaceMessagesComponent} from "./chat-workspace-messages/chat-workspace-messages.component";
import {MessageInputComponent} from "../../../../common-ui/message-input/message-input.component";
import {ChatsService} from "../../../../data/services/chats.service";
import {ChatsInterface, Message} from "../../../../data/interfaces/chats.interface";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [
    ChatWorkspaceMessagesComponent,
    MessageInputComponent
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService);

  chat = input.required<ChatsInterface>();

  messages = signal<Message[]>([]);

  ngOnInit() {
    this.messages.set(this.chat().messages);
  }

  async onSendMessage(message: string) {
    await firstValueFrom(this.chatsService.sendMessage(this.chat().id, message));
    const chat = await firstValueFrom(this.chatsService.getChatById(this.chat().id));

    this.messages.set(chat.messages);
  }
}
