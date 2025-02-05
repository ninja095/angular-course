import { ChangeDetectionStrategy, Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from '../../ui/avatar-upload/avatar-upload.component';
import { ProfileService } from '@ac/data-access';
import { AddressInputComponent, StackInputComponent } from '@ac/common-ui';
@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent, StackInputComponent, AddressInputComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  formBuilder = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUpload!: AvatarUploadComponent;

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
    city: [null],
  });

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUpload.avatar) {
      // @ts-ignore
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUpload.avatar)
      );
    }

    firstValueFrom(
    // @ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
      })
    );
  }


}
