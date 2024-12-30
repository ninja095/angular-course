import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import {
  debounceTime,
  firstValueFrom,
  fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';
import { PostService } from '../../data';
import { PostInputComponent } from '../../ui';
import { PostComponent } from '@ac/posts';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  feed = this.postService.posts;
  private destroy$ = new Subject<void>();

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
    this.resizeFeed();
    fromEvent(window, 'resize')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('resize');
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', height + 'px');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
