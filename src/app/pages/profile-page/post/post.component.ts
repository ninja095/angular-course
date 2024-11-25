import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Post, PostComments} from "../../../data/interfaces/post.interface";
import {AvatarCircleComponent} from "../../../common-ui/avatar-circle/avatar-circle.component";
import {DatePipe} from "@angular/common";
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {PostInputComponent} from "../post-input/post-input.component";
import {CommentComponent} from "./comment/comment.component";
import {PostService} from "../../../data/services/post.service";
import {firstValueFrom} from "rxjs";
import {TimeAgoPipe} from "../../../helpers/pipes/time-ago.pipe";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    TimeAgoPipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  post = input<Post>();
  comments = signal<PostComments[]>([]);
  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreateComment() {
    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
    this.comments.set(comments);
  }
}
