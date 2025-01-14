import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  debounceTime,
  fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';
import { PostInputComponent } from '../../ui';
import { PostComponent } from '../post/post.component';
import { Store } from '@ngrx/store';
import { PostActions, selectAllPosts } from '../../data';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements OnInit, AfterViewInit, OnDestroy {
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  store = inject(Store);

  feed = this.store.selectSignal(selectAllPosts);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.store.dispatch(PostActions.fetchPosts());
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
