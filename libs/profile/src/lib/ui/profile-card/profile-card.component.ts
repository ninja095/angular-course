import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from '@ac/common-ui';
import { Profile } from 'libs/data-access/src/lib/profile';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
