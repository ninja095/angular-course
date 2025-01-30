import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LastMessage } from '@ac/data-access';
import { AvatarCircleComponent } from '@ac/common-ui';

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsBtnComponent {
  chat = input<LastMessage>();
}
