import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import {  PostActions, selectPostComments } from '../../data';
import { CommentComponent, PostInputComponent } from '../../ui';
import { AvatarCircleComponent, SvgIconComponent, TimeAgoPipe } from '@ac/common-ui';
import { Store } from '@ngrx/store';
import { Post, PostComments } from '@ac/data-access';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  store = inject(Store);
  post = input<Post>();
  comments!: Signal<PostComments[]>

  comments2 = computed(() => {
    if (this.comments()?.length > 0) {
      return this.comments()
    }
    return this.post()?.comments
  })

  ngOnInit() {
    const post = this.post();
    if (post) {
      this.store.dispatch(PostActions.fetchComments({ postId: post.id }));
      this.comments = this.store.selectSignal(selectPostComments(post.id));
    }
  }

  onDeletePost(postId: number) {
    this.store.dispatch(PostActions.deletePost({ postId }));
  }
}
