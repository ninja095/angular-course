import {Component, inject, Input} from '@angular/core';
import {AvatarCircleComponent} from "../avatar-circle/avatar-circle.component";
import {toObservable} from "@angular/core/rxjs-interop";
import {ProfileService} from "../../data/services/profile.service";
import {AsyncPipe} from "@angular/common";
import {Profile} from "../../data/interfaces/profile.interface";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    AsyncPipe
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profileService = inject(ProfileService);
  profile$ = toObservable(this.profileService.me);
  @Input() profile!: Profile;
}
