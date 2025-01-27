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
import { AvatarCircleComponent, SvgIconComponent } from '@ac/common-ui';
import { Store } from '@ngrx/store';
import { PostActions } from '../../data';
import { GlobalStoreService } from '@ac/data-access';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2);
  store = inject(Store)
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
      this.store.dispatch(
         PostActions.createComments({
          payload: {
            text: this.postText,
            authorId: this.profile()!.id,
            postId: this.postId(),
            commentId: this.commentId(),
          }
        })
      );
      this.postText = '';
      this.createComment.emit();
      return;
    }

    this.store.dispatch(
      PostActions.createPost({
        payload: {
          title: 'Отличный пост',
          content: this.postText,
          authorId: this.profile()!.id,
        }
      })
    );
    this.postText = '';
  }
}
