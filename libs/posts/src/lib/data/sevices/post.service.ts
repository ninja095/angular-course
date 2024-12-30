import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CommentCreateDto,
  Post,
  PostComments,
  PostCreateDto,
} from '../interfaces/post.interface';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);

  baseUrl = 'https://icherniakov.ru/yt-course/';

  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    return this.#http
      .post<Post>(`${this.baseUrl}post/`, payload)
      .pipe(switchMap(() => this.fetchPosts()));
  }

  fetchPosts() {
    return this.#http
      .get<Post[]>(`${this.baseUrl}post/`)
      .pipe(tap((res) => this.posts.set(res)));
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<PostComments>(`${this.baseUrl}comment/`, payload);
  }

  getCommentsByPostId(postId: number) {
    return this.#http
      .get<Post>(`${this.baseUrl}post/${postId}`)
      .pipe(map((post) => post.comments));
  }

  deletePost(postId: number) {
    return this.#http
      .delete<Post>(`${this.baseUrl}post/${postId}`)
      .pipe(switchMap(() => this.fetchPosts()));
  }

  editPost(postId: number, payload: PostCreateDto) {
    return this.#http
      .patch<Post>(`${this.baseUrl}post/${postId}`, payload)
      .pipe(switchMap(() => this.fetchPosts()));
  }
}
