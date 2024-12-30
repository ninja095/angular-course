import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Post, PostComments } from '../../../../../../apps/angular-course/src/app/data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../../../../apps/angular-course/src/app/common-ui/avatar-circle/avatar-circle.component';
import { SvgIconComponent } from '../../../../../../apps/angular-course/src/app/common-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
import { PostService } from '../../../../../../apps/angular-course/src/app/data/services/post.service';
import { firstValueFrom } from 'rxjs';
import { TimeAgoPipe } from '../../../../../../apps/angular-course/src/app/helpers/pipes/time-ago.pipe';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    TimeAgoPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();
  comments = signal<PostComments[]>([]);
  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreateComment() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    );
    this.comments.set(comments);
  }

  async onDeletePost(postId: number) {
    await firstValueFrom(this.postService.deletePost(postId));
  }
}
