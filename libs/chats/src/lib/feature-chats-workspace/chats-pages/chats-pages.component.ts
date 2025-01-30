import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '../chats-list/chats-list.component';


@Component({
  selector: 'app-chats-pages',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats-pages.component.html',
  styleUrl: './chats-pages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsPagesComponent {

}
