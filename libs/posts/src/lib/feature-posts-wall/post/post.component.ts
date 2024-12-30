import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Post, PostComments, PostService } from '../../data';
import { CommentComponent, PostInputComponent } from '../../ui';
import { AvatarCircleComponent, SvgIconComponent, TimeAgoPipe } from '@ac/common-ui';

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
