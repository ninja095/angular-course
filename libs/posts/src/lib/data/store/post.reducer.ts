import { createFeature, createReducer, on } from '@ngrx/store';
import { PostActions } from './post.actions';
import { Post, PostComments } from '../../../../../data-access/src/lib/posts/interfaces/post.interface';

export interface PostsState {
  posts: Post[];
  comments: { [postId: number]: PostComments[] };
}

const initialState: PostsState = {
  posts: [],
  comments: {},
};

export const postFeature = createFeature({
  name: 'posts',
  reducer: createReducer(initialState,

    on(PostActions.fetchPostsSuccess,
      (state, { posts }) =>
        ({ ...state, posts })),

    on(PostActions.deletePost,
      (state, { postId }) =>
        ({ ...state, posts: state.posts.filter(post => post.id !== postId) })),


    on(PostActions.fetchCommentsSuccess,
        (state, { comments }) => {
        const stateComments = { ...state.comments };
        if (comments.length) {
          stateComments[comments[0].postId] = comments;
        }
         return { ...state, comments: stateComments}
        }
      )
  )
});

