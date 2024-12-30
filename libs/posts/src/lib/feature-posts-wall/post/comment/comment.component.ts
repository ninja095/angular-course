import { Component, input } from '@angular/core';
import { PostComments } from '../../../../../../../apps/angular-course/src/app/data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../../../../../apps/angular-course/src/app/common-ui/avatar-circle/avatar-circle.component';
import { TimeAgoPipe } from '../../../../../../../apps/angular-course/src/app/helpers/pipes/time-ago.pipe';

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
