import {Component, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {PostInputComponent} from "../post-input/post-input.component";
import {PostComponent} from "../post/post.component";
import {PostService} from "../../../data/services/post.service";
import {debounceTime, firstValueFrom, fromEvent, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  feed = this.postService.posts;
  private destroy$ = new Subject<void>();

  @HostListener('window:resize') onResize() {
    console.log('resize');
    this.ngAfterViewInit();
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
    this.listenToResize();
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  private listenToResize() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        takeUntil(this.destroy$)
      )
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
