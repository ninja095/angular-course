import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent, TimeAgoPipe } from '@ac/common-ui';
import { PostComments } from '@ac/data-access';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  comment = input<PostComments>();
}
