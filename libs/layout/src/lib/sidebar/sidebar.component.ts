import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { ImgUrlPipe, SvgIconComponent } from '@ac/common-ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@ac/auth';
import { ChatsService, ProfileService } from '@ac/data-access';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  chatService = inject(ChatsService);
  auth = inject(AuthService);
  destroyRef = inject(DestroyRef)

  subscribers$ = this.profileService.getSubscribers();
  me = this.profileService.me;
  unreadMessagesCount = this.chatService.unreadMessagesCount;

  // wsSubscribe!: Subscription;

  menuItems = [
    { label: 'Моя страница', icon: 'home', link: 'profile/me' },
    { label: 'Чаты', icon: 'chat', link: 'chats' },
    { label: 'Поиск', icon: 'search', link: 'search' },
  ];
  // async reconnectWS() {
  //   await firstValueFrom(this.auth.refreshTokens());
  //   this.connect();
  // }
  // connect() {
  //   this.wsSubscribe?.unsubscribe();
  //   this.wsSubscribe = this.chatService.connectWebSocket()
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef))
  //     .subscribe((message) => {
  //       if (isErrorMessageTypeGuard(message)) {
  //         console.error('Error in WS: ', message);
  //         this.reconnectWS();
  //       }
  //     });
  // }
  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
    this.chatService.connectWebSocket()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
