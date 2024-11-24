import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post, PostCreateDto} from "../interfaces/post.interface";
import {switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  #http = inject(HttpClient)

  baseUrl = 'https://icherniakov.ru/yt-course/';

  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.baseUrl}post/`, payload)
      .pipe(
        switchMap(() => this.fetchPosts())
      )
  }

  fetchPosts() {
    return this.#http.get<Post[]>(`${this.baseUrl}post/`)
      .pipe(
        tap(res => this.posts.set(res))
      )
  }
}
