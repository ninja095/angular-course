import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post, PostCreateDto, CommentCreateDto, PostComments } from '../../../../../data-access/src/lib/posts/interfaces/post.interface';

export const PostActions = createActionGroup({
  source: 'Post',
  events: {
    fetchPosts: emptyProps(),
    fetchPostsSuccess: props<{ posts: Post[] }>(),

    createPost: props<{payload: PostCreateDto}>(),

    deletePost: props<{ postId: number }>(),

    fetchComments: props<{ postId: number }>(),
    fetchCommentsSuccess: props<{ comments: PostComments[] }>(),

    createComments: props<{ payload: CommentCreateDto }>(),
  },
});
