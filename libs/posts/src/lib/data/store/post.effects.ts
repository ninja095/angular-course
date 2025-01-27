import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../../../../data-access/src/lib/posts/sevices/post.service';
import { PostActions } from './post.actions';
import { map, switchMap, tap } from 'rxjs';

@Injectable(
  { providedIn: 'root' }
)
export class PostEffects {

  private actions$ = inject(Actions);
  private postService = inject(PostService)

  fetchPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.fetchPosts),
      switchMap(() =>
        this.postService.fetchPosts().pipe(
          map((posts) =>
            PostActions.fetchPostsSuccess({ posts })),
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      switchMap(({ payload }) =>
        this.postService.createPost(payload).pipe(
          map(() => PostActions.fetchPosts()) // Обновляем список постов после успешного создания
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      switchMap(({ postId }) =>
        this.postService.deletePost(postId).pipe(
          map(() => PostActions.fetchPosts()),
        )
      )
    )
  );

  fetchComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.fetchComments),
      switchMap(({ postId }) =>
        this.postService.getCommentsByPostId(postId).pipe(
          map((comments) =>
            PostActions.fetchCommentsSuccess({ comments: Array.isArray(comments) ? comments : [], })),
        )
      )
    )
  );

  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createComments),
      switchMap(( { payload } ) =>
        this.postService.createComment({
          text: payload.text,
          authorId: payload.authorId,
          postId: payload.postId,
          commentId: payload.commentId,
        }).pipe(
          tap((payload) => console.log('Comments created:', payload)),
          map(() =>
            PostActions.fetchComments({ postId: payload.postId })),
        )
      )
    )
  );
}
