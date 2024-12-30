import { Component, input } from '@angular/core';
import { PostComments } from '../../data';
import { AvatarCircleComponent, TimeAgoPipe } from '@ac/common-ui';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComments>();
}
