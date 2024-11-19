import {Component, signal} from '@angular/core';
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {DndDirective} from "../../../common-ui/directives/dnd.directive";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [
    SvgIconComponent,
    DndDirective,
    FormsModule
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
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
    }
    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
