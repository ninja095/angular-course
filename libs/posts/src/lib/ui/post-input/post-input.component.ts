import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AvatarCircleComponent, SvgIconComponent } from '@ac/common-ui';
import { PostService } from '../../data';
import { GlobalStoreService } from '@ac/shared';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2);
  postService = inject(PostService);
  isCommentInput = input<boolean>(false);
  postId = input<number>(0);
  commentId = input<number>(0);
  profile = inject(GlobalStoreService).me;

  @Output() createComment = new EventEmitter<void>();

  @HostBinding('class.comment-input') get isCommentInputClass() {
    return this.isCommentInput();
  }

  postText = '';

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  createPost() {
    if (!this.postText) return;

    if (this.isCommentInput()) {
      firstValueFrom(
        this.postService.createComment({
          text: this.postText,
          authorId: this.profile()!.id,
          postId: this.postId(),
          commentId: this.commentId(),
        })
      ).then(() => {
        this.postText = '';
        this.createComment.emit();
      });
      return;
    }

    firstValueFrom(
      this.postService.createPost({
        title: 'Отличный пост',
        content: this.postText,
        authorId: this.profile()!.id,
      })
    ).then(() => {
      this.postText = '';
    });
  }
}
