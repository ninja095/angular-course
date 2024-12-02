import {Component, input} from '@angular/core';
import {Message} from "../../../../../data/interfaces/chats.interface";

@Component({
  selector: 'app-chat-workspace-messages',
  standalone: true,
  imports: [],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.scss'
})
export class ChatWorkspaceMessagesComponent {
  message = input.required<Message>();
}
