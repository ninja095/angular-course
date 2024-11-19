import {Component, effect, inject, ViewChild} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";
import {AvatarUploadComponent} from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  formBuilder =  inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUpload!: AvatarUploadComponent;

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        stack: this.mergeStack(this.profileService.me()?.stack),
      })
    })
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUpload.avatar) {
      // @ts-ignore
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUpload.avatar))
    }

    // @ts-ignore
    firstValueFrom(this.profileService.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack),
    }))
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return [];
    return Array.isArray(stack) ? stack : stack.split(',')
      .map(skill => skill.trim());
  }

  mergeStack(stack: string | null | string[] | undefined): string {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(', ');
    return stack;
  }
}
