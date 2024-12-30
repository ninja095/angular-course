import { Component, inject, Input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Profile, ProfileService } from '@ac/profile';
import { AvatarCircleComponent } from '@ac/common-ui';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarCircleComponent, AsyncPipe],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profileService = inject(ProfileService);
  profile$ = toObservable(this.profileService.me);
  @Input() profile!: Profile;
}
