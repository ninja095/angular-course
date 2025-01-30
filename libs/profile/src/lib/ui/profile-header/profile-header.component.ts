import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { AvatarCircleComponent } from '@ac/common-ui';
import { Profile, ProfileService } from '@ac/data-access';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarCircleComponent, AsyncPipe],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  profileService = inject(ProfileService);
  profile$ = toObservable(this.profileService.me);
  @Input() profile!: Profile;
}
