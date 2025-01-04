import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

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
export class SidebarComponent implements OnInit{
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribers();

  me = this.profileService.me;

  menuItems = [
    { label: 'Моя страница', icon: 'home', link: 'profile/me' },
    { label: 'Чаты', icon: 'chat', link: 'chats' },
    { label: 'Поиск', icon: 'search', link: 'search' },
  ];

  async ngOnInit() {
    try {
      await firstValueFrom(this.profileService.getMe());
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }
}
