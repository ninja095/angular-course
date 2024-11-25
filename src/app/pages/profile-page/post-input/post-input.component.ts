import {Component, HostBinding, inject, input, Renderer2} from '@angular/core';
import {AvatarCircleComponent} from "../../../common-ui/avatar-circle/avatar-circle.component";
import {ProfileService} from "../../../data/services/profile.service";
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {PostService} from "../../../data/services/post.service";
import {FormsModule} from "@angular/forms";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  isCommentInput = input<boolean>(false)
  postId = input<number>(0)
  commentId = input<number>(0)
  r2 = inject(Renderer2)
  postService = inject(PostService)
  profile = inject(ProfileService).me

  @HostBinding('class.comment-input') get isCommentInputClass() {
    return this.isCommentInput()
  }

  postText= ''

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  createPost() {
    if (!this.postText) return;

    if(this.isCommentInput()) {
      firstValueFrom(   this.postService.createComment({
        text: this.postText,
        authorId: this.profile()!.id,
        postId: this.postId(),
        commentId: this.commentId(),
      })).then(() => {
        this.postText = ''
      })
      return;
    }

    firstValueFrom(   this.postService.createPost({
      title: 'Отличный пост',
      content: this.postText,
      authorId: this.profile()!.id
    })).then(() => {
      this.postText = ''
    })
  }
}
