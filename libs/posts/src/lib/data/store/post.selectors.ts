import { postFeature } from './post.reducer';
import { createSelector } from '@ngrx/store';


export const selectAllPosts = createSelector(
  postFeature.selectPosts,
  (posts) => posts || []
);

export const selectPostComments = (postId: number) =>
  createSelector(
    postFeature.selectComments,
    (comments) => comments[postId] || []
  );
