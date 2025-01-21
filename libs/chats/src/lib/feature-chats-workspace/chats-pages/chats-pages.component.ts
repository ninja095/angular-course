import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import { ChatsService } from '@ac/chats';

@Component({
  selector: 'app-chats-pages',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats-pages.component.html',
  styleUrl: './chats-pages.component.scss',
})
export class ChatsPagesComponent implements OnInit {
  #chatService = inject(ChatsService);

  ngOnInit() {
    this.#chatService.connectWebSocket().subscribe();
  }
}
