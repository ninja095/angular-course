import { Component, signal } from '@angular/core';
import { DndDirective } from '../../../../../common-ui/src/lib/directives/dnd.directive';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from '@ac/common-ui';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DndDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/images/avatar-placeholder.png');

  avatar: File | null = null;

  onFileChange(event: Event): void {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.processAvatar(file);
  }

  onFileDropped(file: File): void {
    this.processAvatar(file);
  }

  processAvatar(file: File | null | undefined): void {
    if (!file || !file.type.match('image')) {
      return;
    }
    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };
    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
