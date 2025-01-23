import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import { ChatsService } from '@ac/chats';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-chats-pages',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats-pages.component.html',
  styleUrl: './chats-pages.component.scss',
})
export class ChatsPagesComponent {
  #chatService = inject(ChatsService);

  constructor() {
    this.#chatService.connectWebSocket()
      .pipe(takeUntilDestroyed())
      .subscribe();
  }
}
